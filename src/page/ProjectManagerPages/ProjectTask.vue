<template>
  <div class="contains">
    <div class="toolbar">
      <span>项目信息</span>
      <el-select v-model="Projectvalue" placeholder="请选择">
        <el-option
          v-for="item in Projectoptions"
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
      <span>计划规则</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary">生成计划</el-button>
      <el-button type="primary">任务发布</el-button>
    </div>
    <div class="WbsTaskView" style="height:500px;">
      <el-card class="box-card" v-if="iswbsviewShow">
          <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
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
import dataJson from "@/store/data.json";
import treegantt from "@/components/tree-gantt/tree-gantt.vue";
import {
  NewProjects,
  DeleteLists,
  SearchProjects,
  UpdateProject
} from "@/api/ProjectInfoApi";
export default {
  data() {
    return {
      treeDataSource: dataJson,
      Projectoptions: [],
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
        },
      ],
      Projectvalue: "",
      viewvalue: "wbs",
      iswbsviewShow: true,
      isganttviewShow: true,
      isinternetviewShow: false
    };
  },
  components: {
    treegantt
  },
  mounted() {
    SearchProjects()
      .then(res => {
        this.Projectoptions = res.data;
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
    orderByFunc(val) {
      alert("排序");
      alert(val);
    },
    actionFunc(m) {
      alert("编辑");
    },
    deleteFunc(m) {
      alert("删除");
    },
    handlerExpand(m) {
      console.log("展开/收缩");
      m.isExpand = !m.isExpand;
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
}
</style>
