<template>
   <el-container class="main-container">
        <el-aside style="overflow:hidden;width:200px">
        <el-menu router :default-active="activeIndex">
        <el-menu-item index="/BaseDataPages/TemplateClass/TemplateClassPage">
          <el-li style="padding: 0px;">
            <i class="el-icon-menu"></i>模板类型
          </el-li>
        </el-menu-item>
        <el-menu-item index="/BaseDataPages/Template/TemplatePage">
          <el-li>
            <i class="el-icon-menu"></i>项目模板
          </el-li>
        </el-menu-item>
        <el-menu-item index="/BaseDataPages/Team/TeamPage">
          <el-li>
            <i class="el-icon-menu"></i>部门团队
          </el-li>
        </el-menu-item>
        <el-menu-item index="/BaseDataPages/PersonInfo/PersonInfoPage">
          <el-li>
            <i class="el-icon-menu"></i>人员信息
          </el-li>
        </el-menu-item>
        <el-menu-item index="/BaseDataPages/PersonDept/PersonDeptPage">
          <el-li>
            <i class="el-icon-menu"></i>人员部门关系
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
    this.$router.push({
            path: "/BaseDataPages/TemplateClass/TemplateClassPage"
    });
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
