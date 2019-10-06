<template>
  <div>
    <el-container>
      
      <el-aside width="210px">
        <!--<template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
        </template>-->

        <div class="input_class">
          <el-input v-model="input" placeholder="请输入内容" ></el-input>
        </div>
        <el-menu router :default-active="activeIndex">
          <el-menu-item-group>
             <template slot="title"><li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">成员</li></template>
            <el-menu-item index="/TeamPages/MemberInfo"><i class="el-icon-s-custom"></i>所有成员</el-menu-item>
            <el-menu-item index="/SystemSetPages/BaseSet"><i class="el-icon-user-solid"></i>新加入成员</el-menu-item>
            <el-menu-item index="/SystemSetPages/BaseSet"><i class="el-icon-menu"></i>未分配成员</el-menu-item>
            <el-menu-item index="/SystemSetPages/BaseSet"><i class="el-icon-eleme"></i>停用成员</el-menu-item>
          </el-menu-item-group>
         

          <el-menu-item-group>
           
              <template slot="title"><li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">团队</li></template>
    
            
            <div style="margin-left: 20px;  display: block ">
              <el-button size="mini" type="primary" icon="el-icon-plus" style="left:20px">创建</el-button>
              <el-button size="mini" type="primary" icon="el-icon-plus" style="left:20px">排序</el-button>
            </div>
            <el-menu-item index="/TeamPages/TeamInfo"><i class="el-icon-s-flag"></i>ERP软件开发</el-menu-item>
            <el-menu-item index="/TeamPages/TeamInfo"><i class="el-icon-s-flag"></i>APS排产队</el-menu-item>
            
            <el-menu-item index="/TeamPages/TeamInfo"><i class="el-icon-s-flag"></i>财务组</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
    

<style scoped>

.el-container{
  position: relative;
  top: 2px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #eeeff8;
  height: 800px;
  align-self: auto;
}
.el-aside {
  background: rgb(255, 255, 255);
  
  position: relative;
  top: 2px;
  left: 2px;
  bottom: 1px; 
  height: 795px;
  align-self: auto;
}

.el-main {
  
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 795px;
  align-self: auto;
}
.el-menu {
  text-align: left;
}

.text_class {
  color: black;
  position: relative;
  top: 500px;

}

.el-input  {
  background: rgb(255, 255, 255);
  margin-left: 10px;
  margin-top:10px;

  width: 180px;
  height: 40px;
  
}
</style>





