<template>
  <div style="width:100%;height:100%">
    <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-bar"
      mode="horizontal"
      style="width:100%;height:40px"
    >
      <el-container class="main-container">
        <el-menu-item index="/ProjectManagerPages/ProjectWBS">工作分解</el-menu-item>
        <el-menu-item index="">项目计划</el-menu-item>
        <el-menu-item index="">统计</el-menu-item>
        <el-menu-item index="">风险管理</el-menu-item>
        <el-menu-item index="">沟通计划</el-menu-item>
        <el-menu-item index="">会议纪要</el-menu-item>
        <el-menu-item index="">变更管理</el-menu-item>
        <el-menu-item index="">总结</el-menu-item>
      </el-container>
    </el-menu>
    <el-container class="main-container" >
        <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "/ProjectManagerPages/ProjectWBS",
    };
  },
  created() {
    this.$router.push({
      path: "/ProjectManagerPages/ProjectWBS",
    });
  },
  name: "logout",
  methods: {
  }
};
</script>

<style scoped >
.el-menu-bar .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>

