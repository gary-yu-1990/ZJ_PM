<template>
  <div class="contains">
    <div class="toolbar">
      <span>项目信息</span>
      <el-select v-model="Projectvalue" placeholder="请选择">
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
      <el-button type="primary">新增任务</el-button>
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
              <el-button size="mini" @click="handleTask(scope.$index, scope.row)">新增子任务</el-button>
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
  </div>
</template>
<script>
import loacalDataJson from "@/store/data.json";
import treegantt from "@/components/tree-gantt/tree-gantt.vue";
import {SearchProjects} from "@/api/ProjectInfoApi";
import {GetWBSData} from "@/api/WBSApi";
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
      iswbsviewShow: true,
      isganttviewShow: false,
      isinternetviewShow: false
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

.el-table{
  height: 100%;
  margin-bottom: 0px;
  overflow: auto;
}
.el-table__body-wrapper{
    height: 100%;
}



</style>
