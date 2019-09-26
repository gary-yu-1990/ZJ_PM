<template>
<el-container>
   <el-aside width="50%">
      <h2>基本设置</h2>
    <div>
    <el-li><p>昵称</p></el-li>
      <el-input style="width:327px;" placeholder="admin" v-model="cid"></el-input>
    </div>
    <div>
    <el-li><p>简介</p></el-li>
      <el-input style="width:327px;" placeholder="个人简介" v-model="introduce"></el-input>
    </div>
      <div>
    <el-li><el-button>更新个人信息</el-button></el-li>     
      </div>
   </el-aside>
  <el-main>头像</el-main>
</el-container>
    
</template>>

<script>
export default {
    return:
    {
        cid: "",
        introduce: "",
    }
}
</script>>