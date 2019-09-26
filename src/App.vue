<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{ 
    padding: 0;
    margin: 0;
    /* background:#c1e4ec;  */
    }
#app {
  font-family: "PingFang SC","Helvetica Neue",Helvetica,"PingFang SC",
    "Hiragino Sans GB","Microsoft YaHei",
    "微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-scrollbar>div{
    margin-bottom: 0px !important;
}
.el-table__expand-icon--expanded{
    -webkit-transform: none !important;
    transform: none !important;
}
.el-table__expand-icon>.el-icon {
    position: inherit;
    left: 0%;
    top: 0%;
    margin-left: 0px;
    margin-top: 0px;
}
</style>
