<template>
  <el-container class="main-container">
    <div class="pageWrapper">
      <el-aside width="210px">
        <el-menu :default-active="activeIndex">
          <el-menu-item-group>
            <template slot="title">
              <li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">任务</li>
            </template>
            <!-- <el-menu-item @click="CanGetTaskClick">
              <i class="el-icon-eleme" ></i>可领取的任务
            </el-menu-item> -->
             <el-menu-item @click="BeAllocatedClick">
              <i class="el-icon-eleme" ></i>待确认任务
            </el-menu-item>
            <el-menu-item @click="ConfirmedClick">
              <i class="el-icon-eleme" ></i>已确认任务
            </el-menu-item >
             <el-menu-item @click="DoneSearchClick">
              <i class="el-icon-eleme" ></i>已完成的任务
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <div class="pagePanel">
        <div class="contentPanel">
          <div class="buttonPanel">{{selectedTaskStatus| TaskStatus_filter}}</div>
          <div class="content">
            <el-table
              ref="multipleTable"
              :data="TaskData"
              height="100%"
              tooltip-effect="dark"
              style="width: 100%;"
            >
              <el-table-column prop="TaskName" label="任务名称"   width="250" show-overflow-tooltip></el-table-column>
              <el-table-column prop="TaskRemark" label="任务备注" show-overflow-tooltip></el-table-column>
              <el-table-column prop="TaskCeateTime" label="创建时间"  width="120" :formatter="dateFormat" show-overflow-tooltip></el-table-column>
              <el-table-column prop="TaskCeater" label="创建人"  width="80"  show-overflow-tooltip>
                 <template slot-scope="scope">
                 <span>{{ scope.row.TaskCeater | user_filter }}</span>
                 </template>
              </el-table-column>
                <el-table-column prop="TaskOBS_ID" label="OBS名称"  width="200"  show-overflow-tooltip>
                 <template slot-scope="scope">
                 <span>{{ scope.row.TaskOBS_ID | OBS_filter }}</span>
                 </template>
              </el-table-column>
              <el-table-column prop="TaskExecutor" label="执行人"  width="80"  show-overflow-tooltip>
                 <template slot-scope="scope">
                 <span>{{ scope.row.TaskExecutor | user_filter }}</span>
                 </template>
              </el-table-column>
              <el-table-column prop="TaskStatus" label="任务状态"  width="80"  show-overflow-tooltip>
                <template slot-scope="scope">
                 <span>{{ scope.row.TaskStatus | TaskStatus_filter }}</span>
                 </template>
              </el-table-column>
              <!-- <el-table-column prop="TaskType" label="任务分类"  width="80"  show-overflow-tooltip></el-table-column> -->
              <el-table-column prop="FinishTime" label="完工时间"  width="120"  :formatter="dateFormat" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="200" v-if="selectedTaskStatus!='done'">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleChildTask(scope.$index, scope.row)">新增子任务</el-button>
                  <el-button size="mini" @click="handleConfirm(scope.$index, scope.row)" v-if="selectedTaskStatus=='dcr'">确认</el-button>
                  <el-button size="mini" @click="handleDone(scope.$index, scope.row)" v-if="selectedTaskStatus=='ycr'">完工</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import {
  getTaskDataI,
  DoneClickI,
  ConfirmClickI,
} from "@/api/TaskApi";
import { mapState } from "vuex";
import { notice } from '@/assets/js/notice'
const BeforEditData ={};
export default {
  data() {
    return {
      TaskData: [],
      multipleSelection: [],
      selectedTaskStatus:"ycr",//被分配的
      isAddShow: false,
      handType: "add",
      activeIndex: "1",
      formData: {
        ProjectID: "",
        WBS_ID: "",
        EPS_ID: "",
        TaskCode: "",
        TaskName: "",
        TaskRemark: "",
        TaskCeateTime: "",
        TaskCeater: "",
        TaskExecutor: "",
        TaskAccepter: "",
        AccepteTime: "",
        TaskStatus: "",
        FinishTime: "",
        TaskType: "",
      }
    };
  },
  computed: {
    ...mapState({
      ProjectStatusOptions: state => state.ProjectStatusOptions
    })
  },
  mounted() {
    this.getTaskData();
  },
  methods: {
    DoneSearchClick()
    {
       this.selectedTaskStatus="done";
       this.getTaskData();
    },
     ConfirmedClick()
    {
       this.selectedTaskStatus="ycr";
       this.getTaskData();
    },
    BeAllocatedClick(){
       this.selectedTaskStatus="dcr";
       this.getTaskData();
    },
    handleConfirm(index,row)
    {
       let data={
           TaskID:row.TaskID,
           operater:this.$store.state.userInfo["0"].UserID,
        }
        ConfirmClickI(data).then(res => {
            this.getTaskData();
      });
    },
    CanGetTaskClick()
    {   
       this.getTaskData();
    },
    handleDone(index,row){
        let data={
           TaskID:row.TaskID,
           operater:this.$store.state.userInfo["0"].UserID,
        }
        DoneClickI(data).then(res => {
            this.getTaskData();
      });
    },
    handleChildTask(index,row){
         this.$router.push({
        path: "/ProjectManagerPages/ProjectWBS"
      });
      if (this.$route.path == "/ProjectManagerPages/ProjectWBS") {
        EventUtil.$emit("getWBSData");
      }  
    },
 

    
   
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
    
    getTaskData() {
      let data = {
        loginer:this.$store.state.userInfo["0"].UserID,
        type: this.selectedTaskStatus,
      };
      getTaskDataI(data).then(res => {
        this.TaskData = [];
        this.TaskData = res.data;
      });
    }
  },
};
</script>

<style scoped >
.pageWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.pagePanel {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* background-color: rgb(231, 160, 160); */
}
.filterPanel {
  height: 45px;
  padding: 2px;
}
.buttonPanel {
  padding: 2px;
  height: 45px;
}
.contentPanel {
  padding: 2px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 2px solid #eee;
  overflow: hidden;
}

.contentPanel .content {
  overflow: hidden;
  flex: 1;
}
</style>
