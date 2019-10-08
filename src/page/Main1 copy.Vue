<template>
  <div class="wrapper">
    <div class="headerWrapper">
      <el-container class="main-container">
     <el-header  style="60px">
      <ul class="logo">    
        <li >
          <div class="imgbox">
            <img src="../assets/zjlogo.png" style="height:100%">
          </div>
        </li>
        <li >
            <span class="">知匠项目管理系统</span>
        </li>
      </ul>
       <ul class="nav" >  
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>
      </ul>
       <ul class="info">  
        <li >
          <span class="excitbutton">退出</span> 
        </li>
         <li >
          <el-avatar icon="el-icon-user-solid" style="vertical-align:middle;"></el-avatar>
        </li>  
      </ul>
    
    </el-header></el-container>
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
</script>

<style scoped >
  .main-container {
    width: 1500px;
    margin: 0 auto;
    height: 100%;
  }

.el-header {
  /* background-color: rgb(231, 160, 160); */
  color: #333;
  padding: 0;
  border-bottom: 2px solid #e9eef3;
  text-align: center;
}

.el-header li{
  line-height: 60px;
  float: left;
  list-style-type:none;
}
.el-header ul{
  display: inline-block;
  padding-inline-start:0px;
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
.el-header .logo{
  float: left;
}
.el-header .info{
  float: right;
}
.nav li{
  padding-left: 10px;
  padding-right: 10px;
}
.nav li:hover {
  cursor: pointer;
  /* background: #86b450; */
}

.info li{
   padding-left: 10px;
   padding-right: 10px;
}
.logo li{
   padding-left: 10px;
   padding-right: 10px;
}
.imgbox{
  text-align:center; 
  width:70px; 
  height:58px;
  vertical-align:middle;
}


.wrapper{
     height: 100%;
}

.headerWrapper{
  /* position: fixed;  */
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1500;
  height: 60px;
}

.mainWrapper{
  width: 100%;
  height: calc(100% - 60px);
  z-index: 1300;
}


</style>

