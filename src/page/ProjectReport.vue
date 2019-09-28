    <template>
         <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside >
    <el-menu :default-openeds="['1', '2']">
      <el-menu-item index="1">
        <template slot="title"><i class="el-icon-setting"></i>项目信息</template>
      </el-menu-item>
      <el-menu-item index="2">
        <template slot="title"><i class="el-icon-menu"></i>成员信息</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
   <el-container>
     <el-main>
    <el-header style="text-align: left; font-size: 20px; color:black">
      <!-- <el-button type="primary" plain class="headername2" title="此页面为统计报表奥">统计报表</el-button> -->
       <el-popover
    placement="top-start"
    title="主题"
    width="200"
    trigger="hover"
    content="以下为项目统计报表">
    <el-button slot="reference" class="c"><b>项目统计报表</b></el-button>
  </el-popover>
     
     
        <!-- <h class="headername">统计报表</h> -->
        <!-- <el-button type="primary" plain class="headername"><i class="el-icon-apple"></i>项目</el-button>
        <el-button type="primary" plain class="headername"><i class="el-icon-apple"></i>成员</el-button> -->
        
        
        
         <!-- <el-button type="info" round class="headername2"><i class="el-icon-apple"></i>成员</el-button> -->
          <el-button class="a"
    plain
    @click="open1" title="跳转到项目信息" ><i class="el-icon-info"></i>
    项目进度报表
  </el-button>
  <el-button class="a"
    plain
    @click="open2" title="跳转到成员信息"><i class="el-icon-info"></i>
    项目延期报表
  </el-button>
  <span></span>
  <span></span>
  
        <el-popover
    class="b"
    title="更改按钮"
    width="200"
    trigger="hover"
    content="这是一个可更改列表内容的按钮事件">
    <el-button slot="reference" @click="gotolink" class="btn btn-success" style="background:aquamarine"><el-dropdown >
        
        <i class="el-icon-platform-eleme"  >列表编辑<i class="el-icon-arrow-down el-icon--right"></i></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-eleme"></i>查看任务</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-eleme"></i>新增任务</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-eleme"></i>删除任务</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown></el-button>
  </el-popover>
   
  
      
    </el-header>
  
    
    
    
      

    
      <div class="clss10">
        
        <div class="clss1">项目
          <!-- <div class="clss6">TASK1</div> -->
          <div>
          <el-input type="text" v-model="form.a" class="class6" placeholder="#######" ></el-input>
          </div>
        </div>
        <div class="clss2">总任务
          <!-- <div class="clss7">########</div> -->
          <div>
          <el-input type="text" v-model="form.b" class="class6" placeholder="#######"></el-input>
          </div>
        </div>
        <div class="clss3">未开始
          <!-- <div class="clss8">########</div> -->
          <div>
          <el-input type="text" v-model="form.c" class="class6" placeholder="#######"></el-input>
          </div>
        </div>
        <div class="clss4">进行中
          <!-- <div class="clss9">########</div> -->
          <div>
          <el-input type="text" v-model="form.d" class="class6" placeholder="#######"></el-input>
          </div>
        </div>
        <div class="clss5">已完成
          <!-- <div class="clss6">########</div> -->
          <div>
          <el-input type="text" v-model="form.e" class="class6" placeholder="#######"></el-input>
          </div>
        </div>
        <br>
        
        <DIV>
        
          <el-progress type="circle" :percentage="0" class="clsscirele" >

          </el-progress>
      
        </DIV>
        
         

        

        
      </div>
      

      
       
      <el-table :data="tableData" >
        <el-table-column prop="date" label="项目" width="120" style="text-align:center;">
        </el-table-column>
        <el-table-column prop="name" label="总任务" width="120">
        </el-table-column>
        <el-table-column prop="aaaa" label="未开始" width="120" >
        </el-table-column>
        <el-table-column prop="bbbb" label="进行中" width="120">
        </el-table-column>
        <el-table-column prop="cccc" label="已完成" width="120">
        </el-table-column>
        <el-table-column prop="dddd" label="完成率" width="120">
            <el-progress :percentage="0" ></el-progress>
        </el-table-column>
         <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template >
         <el-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <el-button slot="reference" @click=" gotolink2" class="cakan" >查看</el-button>
  </el-popover>
        <el-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <el-button slot="reference" class="bianji">编辑</el-button>
  </el-popover>
      </template>
    </el-table-column>
       
      </el-table>
       
    </el-main>
    
  </el-container>
  
  </el-container>
    </template>

     <style>
  .el-header {
    background-color:white;
    color: #333;
    line-height: 60px;
    margin-top:10px;
    margin-left: 10px;
    margin-right:10px

  }
  .cakan{
    background-color:aquamarine
    
  }
  .bianji{
    background-color:aquamarine
    
  }
  
  .el-aside {
    width: 100%;
  position: relative;

  bottom: 5px; 
  font-weight: bold;
  background:white;
  text-align: center;
  display: block;
  border: 1px;
  align-self: auto;
  margin-top:15px;
    margin-left: 10px;
   
  

 

  
    
  }
  .el-main {
   position: relative;
  background: #E9EEF3;
 
  padding:0px;

   
  
  }
  .el-input{
    margin-top:10px
  }
  .el-table{
       text-align: center;
       
      margin-top: 10px;
    margin-left: 10px;
    margin-right:10px
  }
  .clss10{
    height: 300px;
    
    
    background-color:white;
    border-block-style:initial;
    margin-top: 10px;
    margin-left: 10px;
    margin-right:10px
  }
  .clss0{
    border:1px solid white;
    background-color:white;
  }
  .clss1{
    width: max-content;
    margin-left: 40px;
    margin-top: 50px;
    border:1px solid white;
    background-color:white;
   color:gray;
    float: left;
    text-align: center
  }
  .clss2{
    width: max-content;
    margin-left: 0px;
    margin-top: 50px;
    border:1px solid white;
    background-color:white;
   color:gray;
    float: left;
    text-align: center
  }
  .clss3{
    width: max-content;
    margin-left: 0px;
    margin-top: 50px;
    border:1px solid white;
    background-color:white;
    color:gray;
    float: left;
    text-align: center
  }
  .clss4{
    width: max-content;
    margin-left:  0px;
    margin-top: 50px;
    border:1px solid white;
    background-color:white;
    color:gray;
    float: left;
    text-align: center
  }
  .clss5{
    width: max-content;
    margin-left:  0px;
    margin-top: 50px;
    border:1px solid white;
    background-color:white;
    color:gray;
    float: left;
    font-display: block;
    text-align: center
  }
  .clss6{
    width: max-content;
    color:rgb(217, 252, 19);
    margin-left: 10px;
    border:1px solid white;
    background-color:white;

  }
  .class6{
    width:100%;
    
  }
  .clss7{
    width: max-content;
    color:red;
    margin-left: 10px;
    border:1px solid white;
    background-color:white;

  }
  .clss8{
    width: max-content;
    color:green;
    margin-left: 10px;
    border:1px solid white;
    background-color:white;

  }
  .clss9{
    width: max-content;
    color:blue;
    margin-left: 10px;
    border:1px solid white;
    background-color:white;

  }
  .clsscirele{
    margin-top: 20px;
    margin-left: 470px
    
  }
  .headername{
    font-style: italic;
    color: gray
  }
  .headername2{
     /* font-style: italic; */
    color:write;
  }
  .a{
    background-color:honeydew;
    
    height: 40px;
    
   
    
  }
  .dropdown{
    
    width:max-content;
    margin-left: 720px;
   
 
   border-radius: 4px;
   
   background-color:lightblue;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  
    
    
  }
  .b{
    margin-left: 350px;
  }
  .c{
    font-style: italic;
    font-size: 30px;
    height: 60px;
    border: #E9EEF3
  }
  
 
 
 
</style>

<script>
  export default {
    name:'ProjectReport',
    data() {
      
      const item = {
        date: 'TASK1',
        name: '####',
        aaaa:'####',
        bbbb:'####',
        cccc:'####'
        
      };
      return {
        form:{
           a: '',
           b: '',
           c: '',
           d: '',
           e: '',

        },
        visible: false,
        tableData: Array(20).fill(item),
        title:this.$route.params.title,
      }
    },
     methods: {
       handleClick(row) {
        console.log(row);
      },
      gotolink(){
 
          //点击跳转至上次浏览页面
         // this.$router.go(-1)
 
          //指定跳转地址
          this.$router.replace('/p')
        },
         gotolink2(){
 
          //点击跳转至上次浏览页面
         // this.$router.go(-1)
 
          //指定跳转地址
          this.$router.replace('/p')
        },
      open1() {
        this.$notify({
          title: '成功',
          message: '此页面为本项目基础信息',
          type: 'success'
        });
      },

      open2() {
        this.$notify({
          title: '成功',
          message: '此页面为本项目成员信息',
          type: 'success'
        });
      },

      open3() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open4() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
    }
  };
</script>


