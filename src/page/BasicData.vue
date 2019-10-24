<template>
  <el-container class="main-container">
    <el-aside style="overflow:hidden;width:200px">
      <el-menu router :default-active="activeIndex">
        <el-menu-item-group>
          <template slot="title">
            <li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">人员与组织结构</li>
          </template>
          <el-menu-item index="/BaseDataPages/PersonInfoPage">
              <i class="el-icon-menu"></i>人员信息
          </el-menu-item>
          <el-menu-item index="/BaseDataPages/AccountInfo">
              <i class="el-icon-menu"></i>用户信息
          </el-menu-item>
          <el-menu-item index="/BaseDataPages/DeptsPage">
              <i class="el-icon-menu"></i>企业组织结构
          </el-menu-item>
          <el-menu-item index="/BaseDataPages/OBSPage">
              <i class="el-icon-menu"></i>项目组织结构
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">
            <li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">项目模板</li>
          </template>
          <el-menu-item index="/BaseDataPages/Template/TemplatePage">
              <i class="el-icon-menu"></i>WBS模板
          </el-menu-item>
        </el-menu-item-group>
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
      activeIndex:'/BaseDataPages/PersonInfoPage'
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
  border-right: 2px solid #eee;
}
.el-main {
  margin: 5px 10px 5px 0px;
  height: calc(100% - 20px);
  flex: 1;
  padding: 0px;
}
</style>
