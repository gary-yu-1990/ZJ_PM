<template>
  <div class="index-wrap">
    <el-container>
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
    #notice {
        text-align: center;
       }

.el-header{
    padding: 0 20px 0 10px; 
}

#menu{
   text-align: center;
     background: #86b450;
}
.el-header li{
    float: left;
}
.el-header li:hover{
    cursor: pointer;
    background: #86b450;
}
.el-header i{
    line-height: 50px;
    color: white;
}
.el-header ul:nth-child(1) i{
    font-size: 20px;
    margin:0 10px;
}
.el-header ul:nth-child(2) li span{
    color: white;
    line-height: 50px;
    font-size: 14px;
}
</style>

