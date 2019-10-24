<template>
  <el-container class="main-container">
    <el-aside style="overflow:hidden;width:200px">
      <el-menu router :default-active="activeIndex">
         <el-menu-item >
          <el-li style="padding: 0px;">
          </el-li>
        </el-menu-item>
        <el-menu-item index="/SystemSetPages/AccountInfo">
          <el-li style="padding: 0px;">
            <i class="el-icon-user"></i>用户设置
          </el-li>
        </el-menu-item>
        <el-menu-item index="/SystemSetPages/RoleSet">
          <el-li style="padding: 0px;">
            <i class="el-icon-user"></i>角色设置
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
    return {};
  },
  created() {
    this.$router.push({
      path: "/SystemSetPages/AccountInfo"
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
