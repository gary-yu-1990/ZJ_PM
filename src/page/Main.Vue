<template>
  <div class="wrapper">
    <div class="headerWrapper">
      <el-container class="main-container">
        <el-header style="height:62px">
          <ul class="logo">
            <li>
              <div class="imgbox">
                <img src="../assets/zjlogo.png" style="height:100%" />
              </div>
            </li>
            <li>
              <span class>知匠项目管理系统</span>
            </li>
          </ul>
          <ul class="nav">
            <el-menu
              router
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-submenu index="1">
                <template slot="title">项目管理</template>
                <el-menu-item index="/ProjectManagerPages/ProjectInfo">项目信息</el-menu-item>
                <el-menu-item index="/ProjectManagerPages/ProjectTask">项目任务</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">任务管理</template>
                <el-menu-item index="/TaskManager">进度汇报</el-menu-item>
              </el-submenu>
              <el-menu-item index="/BasicData" >基础信息</el-menu-item>
              <el-menu-item index="/SystemSet" >系统设置</el-menu-item>
              <el-menu-item index="/developSet" >开发工具</el-menu-item>
            </el-menu>
          </ul>
          <ul class="info">
            <li>
              <span class="exitbutton" @click="logout">
                <el-button type="text">退出</el-button>
              </span>
            </li>
            <li>
              <el-avatar icon="el-icon-user-solid" style="vertical-align:middle;"></el-avatar>
            </li>
          </ul>
        </el-header>
      </el-container>
    </div>
    <div class="mainWrapper">
      <el-container class="main-container">
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "logout",
  methods: {
    logout() {
      this.$router.push({
        path: "/"
      }); //利用路由跳转页面，path为你定义的路由配置中要跳转页面的path
    }
  }
};
</script>

<style scoped >
.el-header {
  /* background-color: rgb(231, 160, 160); */
  color: #333;
  padding: 0;
  border-bottom: 2px solid #e9eef3;
  text-align: center;
}

.el-header li {
  line-height: 60px;
  float: left;
  list-style-type: none;
}
.el-header ul {
  display: inline-block;
  padding-inline-start: 0px;
}

.el-header ul:nth-child(1) {
  /* background-color: rgb(231, 160, 160); */
  font-size: 20px;
  margin: 0 10px;
}
.el-header ul:nth-child(2) {
  /* background-color: rgb(231, 160, 160); */
  font-size: 20px;
  margin: 0 10px;
}
.el-header ul:nth-child(3) {
  /* background-color: rgb(231, 160, 160); */
  font-size: 20px;
  margin: 0 10px;
}
.el-header .logo {
  float: left;
}
.el-header .info {
  float: right;
}
.nav li {
  padding-left: 10px;
  padding-right: 10px;
}
.nav li:hover {
  cursor: pointer;
  /* background: #86b450; */
}

.info li {
  padding-left: 10px;
  padding-right: 10px;
}
.logo li {
  padding-left: 10px;
  padding-right: 10px;
}
.imgbox {
  text-align: center;
  width: 70px;
  height: 58px;
  vertical-align: middle;
}

.wrapper {
  height: 100%;
}

.headerWrapper {
  /* position: fixed;  */
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1500;
  height: 62px;
}

.mainWrapper {
  width: 100%;
  height: calc(100% - 62px);
  z-index: 1300;
}
.el-menu .el-menu-item {
  padding: 0 20px;
}
.el-menu {
  margin: 0;
}
</style>

