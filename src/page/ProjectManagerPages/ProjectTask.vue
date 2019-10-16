<template>
  <div class="contains">
    <div class="toolbar">
      <span>项目信息</span>
      <el-select v-model="Projectvalue" @change="ProjectChange" placeholder="请选择">
        <el-option
          v-for="item in project_options"
          :key="item.ProjectCode"
          :label="item.ProjectName"
          :value="item.ProjectCode"
        ></el-option>
      </el-select>
      <span>查看方式</span>
      <el-select v-model="viewvalue" @change="ShowChange" placeholder="请选择">
        <el-option
          v-for="item in viewoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- <span>计划规则</span>
      <el-select v-model="reluevalue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
      <el-button type="primary"  @click="handleTaskSearch">任务查询</el-button>
      <el-button type="primary"  @click="HandAddRootTask">新增任务</el-button>
      <el-button type="primary">生成计划</el-button>
      <el-button type="primary">任务发布</el-button>
    </div>
    <div class="WbsTaskView" style="height:500px;">
      <el-card class="box-card" v-if="iswbsviewShow">
        <el-table
          :data="taskData"
          style="width: 100%;margin-bottom: 0px;"
          row-key="id"
          border
          default-expand-all
          height="100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="WBSName" label="任务名称" sortable width="180"></el-table-column>
          <el-table-column prop="WBSStatus" label="任务状态" ></el-table-column>
          <el-table-column prop="WBSRemark" label="任务说明"></el-table-column>
          <el-table-column prop="WorkingTime" label="工期"></el-table-column>
          <el-table-column prop="WBSExpectStart" label="计划开始时间"></el-table-column>
          <el-table-column prop="WBSExpectFinish" label="计划结束时间"></el-table-column>
          <el-table-column prop="OBS_ID" label="负责人"></el-table-column>
          <!-- <el-table-column prop="CreatePerson" label="创建人"></el-table-column>
          <el-table-column prop="CreateTime" label="创建时间"></el-table-column> -->
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="HandAddChildTask(scope.$index, scope.row)">新增子任务</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card" v-if="isganttviewShow">你好2</el-card>
      <el-card class="box-card" v-if="isinternetviewShow">你好3</el-card>
    </div>
    <div class="taskDetailInfo">
      <el-tabs type="border-card" style="height:100%;">
        <el-tab-pane label="活动详情">活动详情</el-tab-pane>
      </el-tabs>
    </div>
    
    <el-dialog title="新增任务" :visible.sync="isDialogShow" :close-on-click-modal="false" width="50%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-row>
          <el-col :span=11>
            <el-form-item label="任务名称">
              <el-input v-model="formData.WBSName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=11>
            <el-form-item label="任务备注">
              <el-input v-model="formData.WBSRemark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=11>
            <el-form-item label="工期">
              <el-input v-model="formData.WorkingTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=11>
            <el-form-item label="任务状态">
              <el-input v-model="formData.WBSStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=11>
            <el-form-item prop="WBSExpectStart" label="开始时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.WBSExpectStart"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span=11>
            <el-form-item prop="WBSExpectFinish" label="结束时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.WBSExpectFinish"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-left: 240px;">
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import loacalDataJson from "@/store/data.json";
import treegantt from "@/components/tree-gantt/tree-gantt.vue";
import {SearchProjects} from "@/api/ProjectInfoApi";
import {GetWBSData,NewProjectTask,UpdateProjectTask,DeleteTask} from "@/api/WBSApi";
export default {
  data() {
    return {
      project_options: [],
      viewoptions: [
        {
          value: "wbs",
          label: "任务"
        },
        {
          value: "wbsAndGantt",
          label: "任务+甘特图"
        },
        {
          value: "wbsAndInternet",
          label: "任务+网络图"
        },
        {
          value: "Gantt",
          label: "甘特图"
        },
        {
          value: "Internet",
          label: "网络图"
        }],
      taskData:[],
      Projectvalue: "",
      viewvalue: "wbs",
      isDialogShow: false,
      handType: "add",
      iswbsviewShow: true,
      isganttviewShow: false,
      isinternetviewShow: false,
      formData: {
        WBSName: "",
        WBSRemark: "",
        WorkingTime: "",
        WBSStatus: "",
        WBSExpectFinish: "",
        WBSExpectStart: "",
        CreatPerson: "余春来",
        CreateTime: "",
        WBS_PID:"",
        Project_ID:"",
      }
    };
  },
  components: {
    treegantt
  },
  mounted() {
    //查找项目信息
    SearchProjects()
      .then(res => {
        this.project_options = res.data;
      })
      .catch(err => {
        this.$alert(`${err.msg}`, "提示", {
          type: "warning"
        });
      });
  },
  methods: {
     HandAddRootTask(){
     this.formData = {
        WBS_PID:0,
        Project_ID:this.Projectvalue
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
     HandAddChildTask(index,row){
      this.formData = {
        WBS_PID:row.WBS_ID,
        Project_ID:this.Projectvalue
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    handleEdit(index, row) {
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
    },
    handleDelete(index, row) {
      DeleteTask(row)
        .then(res => {
             this.getTaskData();
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    ProjectChange(){
       this.getTaskData();
    },
    ShowChange() {
      if (this.viewvalue === "wbs") {
        this.iswbsviewShow = true;
        this.isganttviewShow = false;
        this.isinternetviewShow = false;
      }
      if (this.viewvalue === "wbsAndGantt") {
        this.iswbsviewShow = true;
        this.isganttviewShow = true;
        this.isinternetviewShow = false;
      }
      if (this.viewvalue === "wbsAndInternet") {
        this.iswbsviewShow = true;
        this.isganttviewShow = false;
        this.isinternetviewShow = true;
      }
      if (this.viewvalue === "Gantt") {
        this.iswbsviewShow = false;
        this.isganttviewShow = true;
        this.isinternetviewShow = false;
      }
      if (this.viewvalue === "Internet") {
        this.iswbsviewShow = false;
        this.isganttviewShow = false;
        this.isinternetviewShow = true;
      }
    },
    getTaskData(){
        GetWBSData({ projectname: this.Projectvalue })
        .then(res => {
             this.taskData=res.data;
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    handleTaskSearch(){
        this.getTaskData();
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewProjectTask(this.formData)
          .then(res => {
                 this.$message({
                   message:'保存成功',
                   duration:3000,
                   });
            this.isDialogShow = false;
            this.getTaskData();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
      if (this.handType === "edit") {
        UpdateProjectTask(this.formData)
          .then(res => {
            this.$alert(`更新成功`, "提示", {
              type: "warning",
            });
            this.isDialogShow = false;
            this.getTaskData();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
    },

  }
};
</script>

<style>
.contains {
  margin: 5px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.WbsTaskView {
  height: 100%;
  flex: 1;
  border: 1px solid #eee;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  /* background-color: #E9EEF3 */
}
.taskDetailInfo {
  height: 200px;

  /* clear: left; */
}
.box-card {
  flex: 1;
  padding: 0;
  overflow: auto;
}

.box-card .el-card__body {
  padding: 0;
  height: 100%;
  overflow: auto;
}

.el-table{
  height: 100%;
  margin-bottom: 0px;
  overflow: auto;
}
.el-table__body-wrapper{
    height: 100%;
}



</style>
