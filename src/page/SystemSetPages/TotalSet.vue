<template>

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside style="width:150px" >
      <el-menu router :default-active="activeIndex">
        <el-menu-item index="/SystemSetPages/PersonInfo"  >
          
          <el-li style="padding: 0px;"><i class="el-icon-user" ></i>用户设置</el-li>
        </el-menu-item>
        <el-menu-item index="/SystemSetPages/BaseSet" >
          <el-li><i class="el-icon-menu"></i>权限设置</el-li>
        </el-menu-item>
        <el-menu-item index="/SystemSetPages/PasswordSet">
          <el-li><i class="el-icon-setting"></i>密码设置</el-li>
        </el-menu-item>
        <el-menu-item index="/SystemSetPages/PersonalSet">
          <el-li><i class="el-icon-setting"></i>个人设置</el-li>
        </el-menu-item>
        <el-menu-item index="/SystemSetPages/TotalSet">
          <el-li><i class="el-icon-user"></i>系统设置</el-li>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container >
      <el-main >
        <router-view></router-view>
       
      </el-main>
    </el-container>
  </el-container>

</template>



<style scoped >

.el-aside {
  width: 100%;
  position: relative;
  top: 0px;
  left: 0px;
  font-weight: bold;
  background:white;
  text-align: center;
  display: block;
  border: 1px;
  align-self: auto;

  
}

.el-main {
  position: relative;
  background: #E9EEF3;
 
  padding:0px;
}
.el-menu {
  text-align: center;
  left: 0px;
  border: 0;
  display: block;
  height: 100%;
  width: 100%;
  background-color: rgb(225, 235, 226);
}

.el-li {
  padding: 0;
  margin: 0;
  right: 0;
  width: 100%;
  font: 20px;
}

.el-aside.el-menu.el-menu-item {
  padding: 0;
  margin: 0;
  right: 0;
  width: 100%;
  font: 20px;
}
</style>
