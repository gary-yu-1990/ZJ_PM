<template>
  <div class="wrapper">
    <div class="headerWrapper">
      <el-header style="height:62px">
        <el-container class="main-container">
          <div style="width:100%;height:100%">
            <ul class="logo" @click="logoClick">
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
              <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <!-- <el-submenu index="1">
                <template slot="title">项目管理</template>
                <el-menu-item index="/ProjectManagerPages/ProjectInfo">项目信息</el-menu-item>
                <el-menu-item index="/ProjectManagerPages/ProjectTask">项目任务</el-menu-item>
                </el-submenu>-->
                <el-menu-item index="/ProjectManagerPages/ProjectInfo">项目管理</el-menu-item>
                <el-menu-item index="/BasicData">基础信息</el-menu-item>
                <el-menu-item index="/SystemSet">系统设置</el-menu-item>
              </el-menu>
            </ul>
            <ul class="info">
              <li>
                <el-select
                  v-model="Projectvalue"
                  @change="ProjectChange"
                  placeholder="              请选择项目"
                >
                  <el-option
                    v-for="item in project_options"
                    :key="item.ProjectCode"
                    :label="item.ProjectName"
                    :value="item.ProjectCode"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    个人中心
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人资料</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                    <el-dropdown-item @click.native="developtoolClik">开发工具</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li>
                <el-avatar icon="el-icon-user-solid" style="vertical-align:middle;"></el-avatar>
              </li>
            </ul>
          </div>
        </el-container>
      </el-header>
    </div>
    <div class="mainWrapper">
      <router-view />
    </div>
  </div>
</template>
<script>
import { SearchProjects } from "@/api/ProjectInfoApi";
import config from "../config/config";
import { mapState } from 'vuex';
import EventUtil from '@/assets/js/EventUtil.js';
export default {
  data() {
    return {
      project_options: [],
      activeIndex: "/ProjectManagerPages/ProjectInfo",
      config: config
    };
  },
  created() {
    this.$router.push({
      path: "/ProjectManagerPages/ProjectInfo"
    });
  },
  name: "logout",
  mounted() {
    //查找项目信息
    SearchProjects().then(res => {
      this.project_options = res.data;
    });
  },
   computed: {
      Projectvalue: {
        get: function () { return this.$store.state.ProjectID } ,
        set: function (val) { this.$store.dispatch("SET_ProjectID",val); }
    }
    },
  methods: {
    logoClick(){
      this.$store.dispatch("SET_ProjectID","");
      this.$router.push(config.HOME_PAGE)
    },
    logout() {
      this.$router.push({
        path: "/"
      }); //利用路由跳转页面，path为你定义的路由配置中要跳转页面的path
    },
    developtoolClik(){
         this.$router.push({
         path: "/developSet"
    });
    },
     ProjectChange(value){
       this.$router.push({
         path: "/ProjectManagerPages/ProjectWBS"
    });
      if(this.$route.path=="/ProjectManagerPages/ProjectWBS")
      {
         EventUtil.$emit('getWBSData')
      }
     
    },
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

.el-container li {
  line-height: 60px;
  float: left;
  list-style-type: none;
}
.el-container ul {
  display: inline-block;
  padding-inline-start: 0px;
}

.el-container ul:nth-child(1) {
  /* background-color: rgb(231, 160, 160); */
  font-size: 20px;
  margin: 0 10px;
}
.el-container ul:nth-child(2) {
  /* background-color: rgb(231, 160, 160); */
  font-size: 20px;
  margin: 0 10px;
}
.el-container ul:nth-child(3) {
  /* background-color: rgb(231, 160, 160); */
  font-size: 20px;
  margin: 0 10px;
}
.el-container .logo {
  float: left;
}
.el-container .info {
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

.logo:hover {
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


