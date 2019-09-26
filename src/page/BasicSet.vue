<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>用户管理
          </template>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>导航二
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="/SystemSetPages/PersonInfo">人员信息</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu router :default-active="activeIndex">
          <el-menu-item index="/SystemSetPages/PersonInfo">权限管理</el-menu-item>
        </el-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <el-table :data="tableData" border="true">
          <el-table-column prop="name" label="姓名" width="140"></el-table-column>
          <el-table-column prop="userName" label="账户" width="120"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      userName: "wxh",
      name: "王小虎",
      password: "123",
      department: "工程部"
    };
    return {
      tableData: Array(5).fill(item)
    };
  }
};
</script>