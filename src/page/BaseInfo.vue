<template>
 <el-container >
      <el-aside width="250px" >
    <el-menu  router :default-active="activeIndex">
     <el-menu-item index="/BaseInfo/PersonInfo">导航一 </el-menu-item>
     <el-menu-item index="/BaseInfo/BaseSet">导航二 </el-menu-item>
     <el-menu-item index="/BaseInfo/PersonInfo">导航三 </el-menu-item>
     <el-menu-item index="/BaseInfo/BaseSet">导航四 </el-menu-item>
    </el-menu>
  </el-aside>
   <el-container>
    <el-main>
           <router-view></router-view>
    </el-main>
  </el-container>
</el-container>     
</template>



<style scoped >


.el-aside{
      bottom: 0px;
   
      border-right: solid 1px #e6e6e6;
}
</style>
