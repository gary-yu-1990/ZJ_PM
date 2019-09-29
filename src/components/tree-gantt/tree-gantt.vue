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
    //解决创建html中出现空白节点的问题
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
    
    //dom更新后延迟执行。
    const vm = this;
    vm.$nextTick(() => {
      vm.initTreeData();
    });

    //将数据源转化成甘特图需要的数据
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
    
    //初始化甘特图
    var gantt_chart = new Gantt(".ganttPanel", this.ganttDataSource, {
     view_mode: 'Day',
    language: 'en'
    });
    vm.gantt_object=gantt_chart;

    //处理甘特图两边同步的问题。
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
</script >

<style lang="less" >
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
  position: relative;
  
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse; //表格合并属性
    border-spacing: 0;
    td {
      word-break: break-all; //自动换行处理办法
      word-wrap: break-word;
      font-size: 12px;
      border-bottom: 1px solid #e8e8e8;
    }
  }

   .td-border {
    border-bottom: 1px solid #e8e8e8;
    .leve {
      // 屏蔽双击不能选择文本样式
      -webkit-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
      &:hover {
        background-color: #f7f9ff;
      }
    }
  }
  th,td {
    font-weight: 400;
    text-align: left;
  }

  .line-height {
    height: 36px;
    line-height: 35px;
  }

  .td1 {
      width: 260px;
      padding-left: 30px;
    }
  .td2 {
      width: 100px;
    }
  .td3 {
      width: 120px;
    }
  .td4 {
      width: 220px;
    }
  .td5 {
      width: 100px;
    }
  .td6 {
      width: 140px;
    }
  
  .task-head {
      .line-height;
      height: 60px;
      line-height: 60px;
      position: relative; //相对定位
      td {
        color: rgba(0, 0, 0, 0.45);
        border-bottom: 2px solid #e8e8e8;
      }
      .td1 {
        width: 250px;
      }
    }

     .task-body {
        top: 40px;
        td {
          .line-height;
           color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
          .line {
            display: inline-block;
            width: 1px;
            background: rgba(0, 0, 0, 0.09);
            margin: 0 11px;
            height: 14px;
          }
        }
        .td-title {
          position: relative;
          a {
            display: block;
          }
          .tree-close,
          .tree-open {
            position: absolute;
            width: 0;
            height: 0;
            border-color: #999;
            border-style: solid;
            cursor: pointer;
            border-width: 5px;
            z-index: 2;
          }
          .tree-close {
            left: -12px;
            top: 14px;
            border-color: transparent transparent transparent #aaaaaa;
          }
          .tree-open {
            left: -17px;
            top: 17px;
            border-color: #aaaaaa transparent transparent;
          }
        }
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
}
.ganttPanel {
  width: 50%;
  height: 100%;
  display: inline-block;
  padding: 0;
  margin: 0;
  background-color: rgb(190, 111, 160);
}
</style>

