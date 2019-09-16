    <template>
    <div>
          <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>今天要完成的任务</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="TaskName"
        label="任务名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskEmergency"
        label="任务紧急程度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="TaskStatus"
        label="任务状态">
      </el-table-column>
       <el-table-column
        prop="TaskCreater"
        label="创建人">
      </el-table-column>
       <el-table-column
        prop="TaskHand"
        label="操作">
      </el-table-column>
    </el-table>
</el-card>
     <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>三日内要完成的任务</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%">
     <el-table-column
        prop="TaskName"
        label="任务名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskEmergency"
        label="任务紧急程度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="TaskStatus"
        label="任务状态">
      </el-table-column>
       <el-table-column
        prop="TaskCreater"
        label="创建人">
      </el-table-column>
       <el-table-column
        prop="TaskHand"
        label="操作">
      </el-table-column>
    </el-table>
</el-card>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>5天后要完成的任务</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column
        prop="TaskName"
        label="任务名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskEmergency"
        label="任务紧急程度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="TaskStatus"
        label="任务状态">
      </el-table-column>
       <el-table-column
        prop="TaskCreater"
        label="创建人">
      </el-table-column>
       <el-table-column
        prop="TaskHand"
        label="操作">
      </el-table-column>
    </el-table>
</el-card>

<el-card class="box-cardnotice">
  <div slot="header" class="clearfix">
    <span>最新动态</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>

<el-card class="box-cardalert">
  <div slot="header" class="clearfix">
    <span>预警信息</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</div>
    </template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            TaskName: '任务1',
            taskEmergency: '紧急',
            TaskStatus:'未完成',
            TaskCreater:'余春来',
          }, {
              TaskName: '任务2',
            taskEmergency: '紧急',
            TaskStatus:'未完成',
            TaskCreater:'余春来',
          }, {
             TaskName: '任务3',
            taskEmergency: '紧急',
            TaskStatus:'未完成',
            TaskCreater:'余春来',
          }, {
            TaskName: '任务4',
            taskEmergency: '紧急',
            TaskStatus:'未完成',
            TaskCreater:'余春来',
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
    width: 800px;
  }

  .box-cardnotice {
  left: 840px;
  position: absolute;
  top: 20px; 
  right: 20px; 
  }

   .box-cardalert {
  left: 840px;
  position: absolute;
  top: 270px; 
  right: 20px; 
  }

</style>
