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
        <el-menu-item index="/ProjectManagerPages/ProjectTask">任务</el-menu-item>
        <el-menu-item index="/ProjectManagerPages/ProjectTask">统计</el-menu-item>
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
      activeIndex: "1",
      config: config
    };
  },
  created() {
    this.$router.push({
      path: "/ProjectManagerPages/ProjectTask",
      query: {ProjectCode:this.$route.query.ProjectCode}
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

