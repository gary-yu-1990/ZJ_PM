<template>
  <div class="contains">
    <div class="toolbar">
      <span>项目信息</span>
      <el-select v-model="value" placeholder="请选择" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="taskgantview" style="height:500px;">
      <treegantt
        :list.sync="treeDataSource"
        @actionFunc="actionFunc"
        @deleteFunc="deleteFunc"
        @handlerExpand="handlerExpand"
        @orderByFunc="orderByFunc"
      ></treegantt>
    </div>
    <div class="taskDetailInfo" >
      <el-tabs type="border-card" style="height:100%;">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import dataJson from "@/store/data.json";
import treegantt from "@/components/tree-gantt/tree-gantt.vue";
export default {
  data() {
    return {
      treeDataSource: dataJson,
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      
    };
  },
  components: {
    treegantt
  },
  methods: {
    orderByFunc(val) {
      alert("排序");
      alert(val);
    },
    actionFunc(m) {
      alert("编辑");
    },
    deleteFunc(m) {
      alert("删除");
    },
    handlerExpand(m) {
      console.log("展开/收缩");
      m.isExpand = !m.isExpand;
    }
  }
};
</script>

<style>
.contains {
  margin: 5px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.taskgantview {
  height: 100%;
  flex: 1;
  border:1px solid #eee;
  margin: 5px 0;
  /* background-color: #E9EEF3 */
}
.taskDetailInfo {
  height: 200px;

  /* clear: left; */
}
</style>
