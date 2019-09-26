<template>
  <div class="contains">
     <div class="taskgantview" style="height:500px;">
       <treegantt :list.sync="treeDataSource" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></treegantt>
       </div>  
     <div class="taskDetailInfo" style="">
     <el-tabs type="border-card" style="height:130px;">
     <el-tab-pane label="用户管理">用户管理</el-tab-pane>
     <el-tab-pane label="配置管理">配置管理</el-tab-pane>
     <el-tab-pane label="角色管理">角色管理</el-tab-pane>
     <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
     </el-tabs>
    </div>  
     <!-- <div id="taskgantview">
        <treegantt :list.sync="treeDataSource" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></treegantt>
     </div> -->
     <!-- <div id="taskDetailInfo" style="background-color: #E9EEF3;">
       <h1>不好</h1>
     </div> -->
  </div>
</template>
<script>
import dataJson from '@/store/data.json'
import treegantt from '@/components/tree-gantt/tree-gantt.vue'
export default {
  data() {
    return {
      treeDataSource: dataJson,
    }
  },
  components: {
   treegantt
  },
  methods: {
    orderByFunc(val) {
      alert('排序')
      alert(val)
    },
    actionFunc(m) {
      alert('编辑')
    },
    deleteFunc(m) {
      alert('删除')
    },
    handlerExpand(m) {
      console.log('展开/收缩')
      m.isExpand = !m.isExpand
    }
  }
}
</script>

<style>
.contains {
    width: 100%;
}
.taskgantview{
  background-color: #E9EEF3
}
.taskDetailInfo{
  background-color: fuchsia;
  height: 150px;
  /* clear: left; */
}
</style>
