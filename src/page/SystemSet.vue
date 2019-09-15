<template>
<div>
    <el-aside >
    <el-menu  router :default-active="activeIndex">
     <el-menu-item index="/SystemSetPages/PersonInfo">导航一 </el-menu-item>
     <el-menu-item index="/SystemSetPages/BaseSet">导航二 </el-menu-item>
     <el-menu-item index="/SystemSetPages/PersonInfo">导航三 </el-menu-item>
     <el-menu-item index="/SystemSetPages/BaseSet">导航四 </el-menu-item></el-menu>
   </el-aside>
    <el-main>
           <router-view></router-view>
    </el-main>
</div>   
</template>



<style scoped >


.el-aside{
  background: rgb(187, 166, 166); 
  width: 300px; 
  position: absolute;
  top: 5px ; 
  left: 5px ;
  bottom: 5px; 
}

.el-main{

  background: rgb(98, 117, 98); 
  left: 300px;
  position: absolute;
  top: 5px; 
  right: 5px; 
  bottom: 5px;  
}
.el-menu{
  text-align:center;
}


</style>
