    <template>
    <div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>项目信息</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="ProjectName"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ProjectStatus"
        label="项目状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ProjectProcsee"
        label="项目进度">
      </el-table-column>
    </el-table>
</el-card>
<el-tabs type="border-card">
  <el-tab-pane label="项目定义">项目定义</el-tab-pane>
  <el-tab-pane label="项目评审">项目评审</el-tab-pane>
  <el-tab-pane label="项目计划">项目计划</el-tab-pane>
  <el-tab-pane label="项目评价">项目评价</el-tab-pane>
  <el-tab-pane label="项目组织">项目组织</el-tab-pane>
  <el-tab-pane label="项目资料">项目资料</el-tab-pane>
</el-tabs>
</div>
    </template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            ProjectName: '雪糕机器人',
            ProjectStatus: '进行中',
            ProjectProcsee: "60%"
          }, {
            ProjectName: '江门东鹏A区',
            ProjectStatus: '进行中',
            ProjectProcsee: '70%'
          }, {
            ProjectName: '金霸建材',
            ProjectStatus: '完成',
            ProjectProcsee: '100%'
          }, {
            ProjectName: '政府补助',
            ProjectStatus: '立项',
            ProjectProcsee: '2%'
          }]
        }
      }
    }
  </script>

    <style scoped >


 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .el-tabs {

  left: 520px;
  position: absolute;
  top: 20px; 
  right: 20px; 
  bottom: 5px;  
  }

</style>
