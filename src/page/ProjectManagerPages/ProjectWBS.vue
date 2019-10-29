<template>
  <div class="contains">
    <div class="toolbar">
      <!-- <span>计划规则</span>
      <el-select v-model="reluevalue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <el-button type="primary" size="mini" @click="HandAddRootTask">新增任务</el-button>
      <el-button type="primary" size="mini" @click="handleTaskSearch">查询</el-button>
      <el-button type="primary" size="mini">生成计划</el-button>
      <el-button type="primary" size="mini">任务投放</el-button>
      <el-select
        v-model="viewvalue"
        @change="ShowChange"
        placeholder="请选择"
        style="float:right"
        size="mini"
      >
        <el-option
          v-for="item in viewoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
          @row-dblclick="handRowDblClick"
        >
          <el-table-column prop="WBSName" label="任务名称" width="300"></el-table-column>
          <el-table-column prop="WBSRemark" label="任务说明" width="200"></el-table-column>
          <el-table-column prop="WorkingTime" label="工期(天)" width="80"></el-table-column>
          <el-table-column prop="WBSExecutor" label="执行者" width="100">
               <template slot-scope="scope">
                <span>{{ scope.row.WBSExecutor | OBS_filter }}</span>
              </template>
          </el-table-column>
          <el-table-column prop="WBSStatus" label="任务状态" width="120">
             <template slot-scope="scope">
                <span>{{ scope.row.WBSStatus | WBSStatus_filter }}</span>
              </template>
          </el-table-column>
          <el-table-column prop="WBSExpectStart" label="计划开始时间" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="WBSExpectFinish" label="计划结束时间" :formatter="dateFormat"></el-table-column>
          <!-- <el-table-column prop="CreatePerson" label="创建人"></el-table-column> -->
          <!-- <el-table-column prop="CreateTime" label="创建时间"></el-table-column> -->
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <el-button size="mini" @click="HandAddChildTask(scope.$index, scope.row)">新增子节点</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="handleRelease(scope.$index, scope.row)">投放</el-button>
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

    <el-dialog title="新增任务" :visible.sync="isDialogShow" :close-on-click-modal="false" width="30%">
      <el-form ref="form" :model="formData" label-width="100px">
        <el-form-item label="任务名称" width="100%">
          <el-input v-model="formData.WBSName"></el-input>
        </el-form-item>
        <el-form-item label="任务备注" width="100%">
          <el-input v-model="formData.WBSRemark"></el-input>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="formData.WBSStatus" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in WBSStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行者">
          <el-select v-model="formData.WBSExecutor"  disabled placeholder="请选择" style="width:83%">>
            <el-option
              v-for="item in OBSInfoOption"
              :key="item.OBS_ID"
              :label="item.OBSName"
              :value="item.OBS_ID"
            >
            </el-option>
          </el-select> 
          <el-button icon="el-icon-search" @click="WBSExecutorClick"></el-button>
        </el-form-item>
        <el-form-item label="工期（天）">
          <el-input v-model="formData.WorkingTime"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="计划开始日期"
              v-model="formData.WBSExpectStart"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              placeholder="计划结束日期"
              v-model="formData.WBSExpectFinish"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="任务名称"
      :visible.sync="isOBSDialogShow"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-table
        :data="obsData"
        style="width:100%;margin-bottom:0px;"
        row-key="id"
        border
        default-expand-all
        height="100%"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="OBSName" label="组织名称" width="300"></el-table-column>
        <el-table-column prop="OBS_Type" label="组织类型" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.OBS_Type | OBS_Type_filter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="OBSRemark" label="备注" width="150"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="HandOBSSelected(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import loacalDataJson from "@/store/data.json";
import treegantt from "@/components/tree-gantt/tree-gantt.vue";
import { SearchProjects } from "@/api/ProjectInfoApi";
import {
  GetWBSData,
  NewProjectTask,
  UpdateProjectTask,
  DeleteTask,
  ReleaseWBSI,
} from "@/api/WBSApi";
import { GetOBSDataI } from "@/api/OBSApi";
import { notice } from "@/assets/js/notice";
import { mapState } from "vuex";
import EventUtil from "@/assets/js/EventUtil.js";
const BeforEditData ={};
export default {
  data() {
    return {
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
        }
      ],
      obsData: [],
      taskData: [],
      viewvalue: "wbs",
      isDialogShow: false,
      isOBSDialogShow: false,
      handType: "add",
      iswbsviewShow: true,
      isganttviewShow: false,
      isinternetviewShow: false,
      formData: {
        WBSName: "",
        WBSRemark: "",
        WorkingTime: "",
        WBSExecutor: "",
        WBSStatus: 'create',
        WBSExpectFinish: "",
        WBSExpectStart: "",
        CreatPerson: "",
        CreateTime: "",
        WBS_PID: "",
        Project_ID: ""
      }
    };
  },
  components: {
    treegantt
  },
  mounted() {
    //查找项目信息
    this.getTaskData();
    // 监听此事件
    EventUtil.$on("getWBSData", () => {
      this.getTaskData();
    });

    GetOBSDataI().then(res => {
      this.obsData = res.data;
    });
  },
  computed: {
    ...mapState({
      Projectvalue: state => state.ProjectID,
      WBSStatusOptions: state => state.WBSStatusOptions,
      OBSInfoOption: state => state.OBS.OBSInfo
    })
  },
  methods: {
    handleRelease(index, row){
      let data={
          wBS_ID:row.WBS_ID,
          releaser:this.$store.state.userInfo["0"].UserID,
      }
       ReleaseWBSI(data).then(res => {
        this.getTaskData();
        notice("投放成功!", "success");
      });
    },
    HandOBSSelected(index, row) {
      this.formData.WBSExecutor = row.OBS_ID;
      this.isOBSDialogShow = false;
    },
    WBSExecutorClick() {
      this.isOBSDialogShow = true;
    },
    handRowDblClick(row, column, event) {
      // this.formData = {
      //   WBS_PID: row.WBS_ID,
      //   Project_ID: this.Projectvalue
      // };
      // this.handType = "add";
      // this.isDialogShow = true;
    },

    HandAddRootTask() {
      this.formData.WBS_PID=0;
      this.formData.Project_ID=this.Projectvalue;
      this.handType = "add";
      this.isDialogShow = true;
    },
    HandAddChildTask(index, row) {
      this.formData.WBS_PID=row.WBS_ID;
      this.formData.Project_ID=this.Projectvalue;
      this.handType = "add";
      this.isDialogShow = true;
    },
    handleEdit(index, row) {
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
      this.BeforEditData=Object.assign({}, row)
    },
    handleDelete(index, row) {
      DeleteTask(row).then(res => {
        this.getTaskData();
        notice("删除成功!", "success");
      });
    },
    ProjectChange() {
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
    getTaskData() {
      GetWBSData({ projectname: this.Projectvalue }).then(res => {
        this.taskData = res.data;
      });
    },
    handleTaskSearch() {
      this.getTaskData();
      this.$store.dispatch("GET_USERS").then(() => {});
      this.$store.state;
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewProjectTask(this.formData).then(res => {
          notice("保存成功");
          this.isDialogShow = false;
          this.getTaskData();
        });
      }
      if (this.handType === "edit") {
        this.formData.UpdateColumns=this.array_diff(this.BeforEditData,this.formData)
        UpdateProjectTask(this.formData).then(res => {
          notice("更新成功");
          this.isDialogShow = false;
          this.getTaskData();
        });
      }
    }
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

.el-table {
  height: 100%;
  margin-bottom: 0px;
  overflow: auto;
}
.el-table__body-wrapper {
  height: 100%;
}
</style>
