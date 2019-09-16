<template>
  <el-menu router :default-active="activeIndex" class="nav_menu" mode="horizontal">
    <li id="head">
      <span id="head_logo"></span>
    </li>
    <li id="projectname">匠心项目管理系统</li>
    <el-menu-item index="/MyTask">工作台</el-menu-item>
    <el-menu-item index="/ProjectManager">项目管理</el-menu-item>
    <el-menu-item index="/SystemSet">任务管理</el-menu-item>
    <!--<el-menu-item index="/SystemSet">项目监控</el-menu-item>-->
    <el-menu-item index="/SystemSet">项目绩效</el-menu-item>
    <el-menu-item index="/ProjectReport">项目统计</el-menu-item>
    <el-menu-item index="/ProjectBaseData">基础数据</el-menu-item>
    <el-menu-item index="/KnowledgeBase">知识管理</el-menu-item>
    <el-menu-item index="/SystemSet">基础设置</el-menu-item>
    <li class="info">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    </li>
    <li class="info_label">登录</li>
    <li class="info_label">|</li>
    <li class="info_label">注册</li>
  
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu"
};
</script>
<style scoped>
#navigator {
  height: 100px;
  line-height: 30px;
  background-color: chartreuse;
  color: #999;
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

.info {
  display: block;
  margin-top: 10px;
  float: right;
}
.info_label {
  margin-top: 20px;
  margin-right: 10px;
  display: block;
  float: right;
}

#head {
  display: block;

  float: left;
}
#head_logo {
  margin-top: 10px;
  width: 42px;
  height: 42px;
  margin-right: 15px;
  line-height: 60px;
  display: inline-block;
  border-radius: 21px;
  background: url("../assets/logo.png") no-repeat;
  background-size: 42px 42px;
}

#projectname {
  margin-top: 13px;
  display: block;
  float: left;
  margin-right: 200px;
  font-size: 20px;
}
</style>

