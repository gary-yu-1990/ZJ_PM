<template>
  <el-container class="main-container" >
  <el-header style="height:60px">
     <el-menu router :default-active="activeIndex" class="nav_menu" mode="horizontal" style="height:60px">
     <li>
       <img src="../assets/zjlogo.png" alt="" style="height:50px">
     </li>
     <li class="sysName" style="font-size:25px">知匠项目管理系统</li>
    <el-menu-item index="/ProjectManager">项目管理</el-menu-item>
    <el-menu-item index="/TaskManager">任务管理</el-menu-item>
    <!--<el-menu-item index="/SystemSet">项目监控</el-menu-item>-->
    <!-- <el-menu-item index="/SystemSet">项目绩效</el-menu-item> -->
    <el-menu-item index="/ProjectReport">项目统计</el-menu-item>
    <el-menu-item index="/ProjectBaseData">基础数据</el-menu-item>
    <!-- <el-menu-item index="/KnowledgeBase">知识管理</el-menu-item> -->
    <el-menu-item index="/SystemSet">基础设置</el-menu-item>
     <el-menu-item index="/TeamManager">团队管理</el-menu-item>
    <li class="info"><el-avatar icon="el-icon-user-solid"></el-avatar></li> 
    <li class="info" >登录</li>
    <li class="info">|</li>
    <li class="info">注册</li>
     </el-menu>
  </el-header>
  <el-main>
      <keep-alive>
            <router-view></router-view>
      </keep-alive>
  </el-main>
</el-container>
</template>

<script>
</script>

<style scoped >

@media (min-width: 1920px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1600px;
    margin: 0 auto;
  }
}
@media (max-width: 1920px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1600px;
    margin: 0 auto;
  }
}
@media (max-width: 1680px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1500px;
    margin: 0 auto;
  }
}
@media (max-width: 1440px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1400px;
    margin: 0 auto;
  }
}
@media (max-width: 1366px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1347px;
    margin: 0 auto;
  }
}
@media (max-width: 1280px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1260px;
    margin: 0 auto;
  }
} /*>=1280的设备*/
@media (max-width: 1100px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1080px;
    margin: 0 auto;
  }
} /*>=1100的设备*/
@media (max-width: 1024px) {
  .main-container {
    /* background-color: aquamarine; */
    width: 1000px;
    margin: 0 auto;
  }
} /*>=1024的设备*/

 .el-header {
    background-color:white;
    color: #333;
    padding: 0;
    border-bottom:2px solid #E9EEF3
  }
   .el-menu li {
      display: list-item;
      text-align: -webkit-match-parent;
     float: left;
   } 
   
   .el-menu .info{
     height: 60px;
    line-height: 60px;
    margin: 0px 10px;
       float: right;
   }
   .el-menu .sysName{
       height: 60px;
       line-height: 60px;
       margin: 0;
       padding-right: 100px;
   }
    .el-menu .el-avatar{
      margin-left: 20p;
      text-align: center;
      margin-top: 10px;
    }
  .el-main {
    /* background-color: #E9EEF3;
    color: #333;
    text-align: center; */
    padding: 0;
  }
 
</style>

