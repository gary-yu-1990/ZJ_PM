<template>
  <div class="index-wrap">
      <el-container id="el-container">
        <el-header height="50px"> 
          <div id="menu">
          <navMenu></navMenu>
          </div>
          </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
  </div>
</template>

<script>
import navMenu from '../components/NavMenu'
  export default {
    name: "Index" ,
    components: {
      navMenu
    }
  }
</script>


<style scoped >
  
.el-header{
    padding: 0 20px 0 10px; 
}

.el-header li{
    float: left;
}
</style>

