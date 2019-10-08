<template>
       <el-container>
        <el-aside style="overflow:hidden;width:200px">
        <el-menu router :default-active="activeIndex">
        <el-menu-item index="/ProjectManagerPages/ProjectInfo">
          <el-li style="padding: 0px;">
            <i class="el-icon-user"></i>项目信息
          </el-li>
        </el-menu-item>
          <el-menu-item index="/ProjectManagerPages/ProjectTask">
          <el-li style="padding: 0px;">
            <i class="el-icon-user"></i>任务信息
          </el-li>
        </el-menu-item>
      </el-menu>
      </el-aside>
       <el-main>
            <keep-alive>
            <router-view />
           </keep-alive>
       </el-main>
    </el-container>
</template>

<script>
  export default {
  data() {
    return {
    };
  },
  created() {
  }
};
</script>

<style scoped >
.el-aside {
   margin: 5px 10px 5px 0px;
   height: calc(100% - 20px);
   /* background-color: rgb(231, 160, 160); */
   border: 2px solid #eee
}
.el-main{
   margin: 5px 10px 5px 0px;
   height: calc(100% - 20px);
   flex:1;
   padding: 0px;
}

</style>
