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
html,body{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 16px;
  color: #2c3e50;
}
#app{
  height: 100%;
  width: 100%;
}
</style>
