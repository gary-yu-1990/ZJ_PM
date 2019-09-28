<template>
  <div ref="ganttfef" class="tree-gantt">
    <div class="taskPanel">
        <div class="task-head">
          <table>
            <tr>
              <td class="td1">职位名称</td>
              <td class="td2">负责人</td>
              <td class="td3">开始时间</td>
              <td class="td5">持续天数</td>
              <td class="td6">操作</td>
            </tr>
          </table>
        </div>
        <div class="task-body">
          <table v-if="treeDataSource.length>0">
            <tbody>
              <tr>
                <td>
                  <tree-item
                    v-for="(model,i) in treeDataSource"
                    :key="'root_node_'+i"
                    :root="0"
                    :num="i"
                    @actionFunc="actionFunc"
                    @deleteFunc="deleteFunc"
                    @handlerExpand="handlerExpand"
                    :nodes="treeDataSource.length"
                    :trees.sync="treeDataSource"
                    :model.sync="model"
                  ></tree-item>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="ganttPanel"></div>
  </div>
</template>

<script>
import Gantt from "@/components/tree-gantt/gantt/index.js";
export default {
  name: "treeTable",
  props: ["list"],
  data() {
    return {
      treeDataSource: [],
      ganttDataSource: []
    };
  },
  watch: {
    list: {
      handler() {
        console.log("ddddd");
        this.initTreeData();
      },
      deep: true
    },
    isDesc(nelVal, oldVal) {
      this.$emit("orderByFunc", nelVal);
    }
  },
  computed: {},
  methods: {
    initTreeData() {
      console.log("处理前的:", JSON.parse(JSON.stringify(this.list)));
      // 这里一定要转化，要不然他们的值监听不到变化
      let tempData = JSON.parse(JSON.stringify(this.list));
      let reduceDataFunc = (data, level) => {
        data.map((m, i) => {
          m.isExpand = false;
          m.children = m.children || [];
          m.level = level;
          m.bLeft = level === 1 ? 34 : (level - 2) * 16 + 34;
          m.Experience = m.Experience || "无";
          if (m.children.length > 0) {
            reduceDataFunc(m.children, level + 1);
          }
        });
      };
      reduceDataFunc(tempData, 1);

      console.log("处理后的:", tempData);
      this.treeDataSource = tempData;

      //1、检查数据中为展开的想
      //初始化甘特图数据
    },
    getMore() {
      alert("滚动到底部加载更多");
      // 滚动到最后
      $("#scrollWrap").mCustomScrollbar("scrollTo", "top", {
        scrollInertia: 0
      });
    },
    // 编辑
    actionFunc(m) {
      this.$emit("actionFunc", m);
    },
    // 删除
    deleteFunc(m) {
      this.$emit("deleteFunc", m);
    },
    // 展开
    handlerExpand(m) {
      this.$emit("handlerExpand", m);
      this.ganttDataSource = [];
      //获取最新的gantt 任务集合
      let reduceGanttDataFunc = (fatherdata, data, level, ganttDataSource) => {
        data.map((m, i) => {
          if (m.isExpand) {
            //true
            var obj = {};
            obj["p_start"] = m.StartTime;
            obj["p_end"] = m.EndtTime;
            obj["name"] = m.ObjectName;
            obj["id"] = "task " + m.Id;
            obj["progress"] = 20;
            var flage = 0;
            for (let index = 0; index < ganttDataSource.length; index++) {
              const element1 = ganttDataSource[index];
              if (element1.id == obj.id) {
                flage = 1;
                break;
              }
            }
            if (flage == 0) {
              ganttDataSource.push(obj);
            }

            if (m.children.length > 0) {
              reduceGanttDataFunc(m, m.children, level + 1, ganttDataSource);
            }
          } else {
            //如果上一级是展开，那么下一级即使时候关闭的也要显示出来
            if (fatherdata != null && fatherdata.isExpand == true) {
              var obj = {};
              obj["p_start"] = m.StartTime;
              obj["p_end"] = m.EndtTime;
              obj["name"] = m.ObjectName;
              obj["id"] = "task " + m.Id;
              obj["progress"] = 20;
              var flage = 0;
              for (let index = 0; index < ganttDataSource.length; index++) {
                const element1 = ganttDataSource[index];
                if (element1.id == obj.id) {
                  flage = 1;
                  break;
                }
              }
              if (flage == 0) {
                ganttDataSource.push(obj);
              }
            } else if (fatherdata == null && m.isExpand == false) {
              var obj = {};
              obj["p_start"] = m.StartTime;
              obj["p_end"] = m.EndtTime;
              obj["name"] = m.ObjectName;
              obj["id"] = "task " + m.Id;
              obj["progress"] = 20;
              var flage = 0;
              for (let index = 0; index < ganttDataSource.length; index++) {
                const element1 = ganttDataSource[index];
                if (element1.id == obj.id) {
                  flage = 1;
                  break;
                }
              }
              if (flage == 0) {
                ganttDataSource.push(obj);
              }
            }
          }
        });
      };
      reduceGanttDataFunc(null, this.treeDataSource, 1, this.ganttDataSource);

      this.gantt_object.refresh(this.ganttDataSource);
      //这里触发刷新甘特图重新绘制
      console.log("重新绘制" + this.gantt_object);
    }
  },
  components: {
    treeItem: () => import("@/components/tree-gantt/tree/tree-item.vue")
  },
  mounted() {
    let removeWhitespace = element => {
      var elem = element,
        cur = elem.firstChild,
        tmp,
        reg = /\S/; //这里最好将正则保存在一个变量里，如果在下面使用直接量，会造成一定的性能问题，直接量不是一个对象，所以它没有方法，系统在执行它时会临时包装一个空白对象，这样如果页面文件很大时，就会出现性能问题。
      while (cur !== null) {
        tmp = cur.nextSibling;
        if (cur.nodeType === 3 && !reg.test(cur.nodeValue)) {
          elem.removeChild(cur);
        } else if (cur.nodeType === 1) {
          removeWhitespace(cur);
        }
        cur = tmp;
      }
      return elem;
    };
    removeWhitespace(this.$refs.ganttfef);
    const vm = this;
    vm.$nextTick(() => {
      vm.initTreeData();
    });
    let tempData = JSON.parse(JSON.stringify(this.list));
    for (let index = 0; index < tempData.length; index++) {
      const element = tempData[index];
      var obj = {};
      obj["p_start"] = element.StartTime;
      obj["p_end"] = element.EndtTime;
      obj["name"] = element.ObjectName;
      obj["id"] = "task " + element.Id;
      obj["progress"] = 20;
      this.ganttDataSource.push(obj);
    }

      var gantt_chart = new Gantt(".ganttPanel", this.ganttDataSource, {
    	view_mode: 'Day',
    	language: 'en'
    });
    vm.gantt_object=gantt_chart;

    var l=document.querySelector('.taskPanel');
    var r=document.querySelector('.gantt-container');

    var flage=true;
    l.addEventListener('mouseover',function (e) {
      flage=false
      l.addEventListener('scroll',function (e) {
        if(!flage)
        {
        var scale=(l.scrollHeight-l.clientHeight)/(r.scrollHeight-r.clientHeight);
          r.scrollTop=l.scrollTop
        }

      })

    })
      r.addEventListener('mouseover',function (e) {
      flage=false
      r.addEventListener('scroll',function (e) {
        if(!flage)
        {
            var scale=(l.scrollHeight-l.clientHeight)/(r.scrollHeight-r.clientHeight);
          l.scrollTop=r.scrollTop
        }
      })

    })
  }
};
</script>

<style  scoped >
.tree-gantt {
  width: 100%;
  height: 100%;
}

.taskPanel {
  width: 50%;
  height: 100%;
  overflow: auto;
  display: inline-block;
  padding: 0;
  margin: 0;
  /* background-color: aqua; */
}

.ganttPanel {
  width: 50%;
  height: 100%;
  display: inline-block;
  padding: 0;
  margin: 0;
  /* border:1px solid #ccc; */
  background-color: rgb(190, 111, 160);
}


.task-body td {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
 }

.task-head {
    height: 60px;
    line-height: 60px;
 }

.taskPanel .td1 {
    width: 260px;
    padding-left: 30px;
  }
 .taskPanel .td2 {
    width: 100px;
  }
 .taskPanel.td3 {
     width: 120px;
  }
 .taskPanel .td4 {
   width: 220px;
 }
 .taskPanel .td5 {
   width: 100px;
  }
 .taskPanel .td6 {
     width: 140px;
  }
 
.taskPanel table
 {
    width: 100%;
    text-align: center;
    border-collapse: collapse; 
    border-spacing: 0;
 }

.taskPanel table td {
       word-break: break-all;
       word-wrap: break-word;
       font-size: 12px;
       border-bottom: 1px solid #e8e8e8;
     }

 .leve-1 .td1 {
   padding-left: 30px;
 }
 .leve-2 .td1 {
  padding-left: 46px;
 }
 .leve-3 .td1 {
  padding-left: 62px;
}
.leve-4 .td1 {
  padding-left: 78px;
}
.leve-5 .td1 {
 padding-left: 90px;
 }
.leve-6 .td1 {
 padding-left: 106px;
}
 .leve-7 .td1 {
  padding-left: 122px;
 }
.leve-8 .td1 {
 padding-left: 138px;
}
.leve-9 .td1 {
 padding-left: 154px;
}


.taskPanel table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}

 .task-body .td-title .tree-close, .task-body .td-title .tree-open {
    position: absolute;
    width: 0;
    height: 0;
    border-color: #999;
    border-style: solid;
    cursor: pointer;
    border-width: 5px;
    z-index: 2;
}

.taskPanel .td-border {
    border-bottom: 1px solid #E8E8E8;
}

.taskPanel .task-body .other-node > .not-border:not(:last-child) {
    position: relative;
}

.taskPanel .task-body .other-node {
    position: relative;
}

.td-title a{
  display: block;
}

.taskPanel .leve-1 .td1 {
    padding-left: 30px;
}


/*滚动条样式*/
div::-webkit-scrollbar {
  width: 17px; /*垂直滚动条的宽度*/
  height: 17px; /*水平滚动条的宽度*/
}

/*滑块样式*/
div::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #999;
}

/*轨道样式*/
div::-webkit-scrollbar-track {
  border-radius: 0;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e8e8e8;
}
</style>

