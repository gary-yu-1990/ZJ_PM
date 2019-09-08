<template>
  <el-menu :default-active="activeIndex" class="nav_menu" mode="horizontal">
    <li id="head">
      <span id="head_logo"></span>
    </li>
    <li id="projectname">匠心项目管理系统</li>
    <el-menu-item index="1">我的任务</el-menu-item>
    <el-menu-item index="2">项目管理</el-menu-item>
    <el-menu-item index="3">进度报表</el-menu-item>
    <el-menu-item index="4">知识库</el-menu-item>
    <li id="info">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    </li>
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
#info {
  margin-top: 10px;
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
  margin-right: 400px;
  font-size: 20px;
}
</style>

