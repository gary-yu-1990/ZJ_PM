<template>
  <div class="index-wrap">
    <el-container id="el-container">
      <el-header height="50px">
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
  padding: 0 20px 0 10px;
}


</style>

