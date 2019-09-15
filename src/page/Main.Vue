<template>
  <div class="index-wrap">
    <el-container id="el-container">
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navMenu from "../components/NavMenu";
export default {
  name: "main",
  components: {
    navMenu
  }
};
</script>


<style scoped >
.el-header {
  height: 60px;
  /*background: #BBE8F2;*/ 
}
.el-main{
  background:rgb(245, 237, 237); 
  width: 100%; 
  position: absolute;
  top: 60px ; 
  left: 0 ;
  bottom: 0; 
}


</style>

