<template>
<div>
  <div id="head"><span id="aside-logo"></span> 
 <span>匠心项目管理</span>   </div>
<div id="menu">
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
 <el-menu-item index="1" >我的任务</el-menu-item>
 <el-submenu   index="2">
    <template slot="title">项目管理</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu></el-submenu>
  <el-menu-item index="3" >进度报表</el-menu-item> 
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">知识库</a></el-menu-item>
</el-menu>
</div>
</div>

</template>

<script>
export default {
  name: 'NavMenu'
}
</script>


<style scoped>
#aside-logo{
    width: 42px;
    height: 42px;
    margin-right: 15px;
    line-height: 60px;
    display: inline-block;
    border-radius: 21px;
    background: url('../assets/logo.png') no-repeat;
    background-size: 42px 42px;
}

#head,#menu{
    background-color:#459898;
    position:absolute;
} 
#head{
    top:20px;
    left:20px;
}
#menu{
    top:20px;
    left:260px;
} 
</style>

