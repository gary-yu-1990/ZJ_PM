<template>
  <div class="pagePanel">
    <div class="filterPanel">
      <el-date-picker
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="日期区间"
        v-model="beginTime"
        style="width:14%;"
      ></el-date-picker>--
      <el-date-picker
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="日期区间"
        v-model="finishTime"
        style="width:14%;"
      ></el-date-picker>
      <el-select v-model="status" placeholder="全部状态">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="buttonPanel">
      <el-button size="medium" @click="newOne" type="primary">新建</el-button>
      <el-button size="medium" @click="editeOne" type="primary">编辑</el-button>
      <el-button size="medium" @click="deleteSelectd" type="primary">删除</el-button>
      <el-button size="medium" type="success" @click="SearchProjectList()">查询</el-button>
    </div>
    <div class="contentPanel">
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="projectListData"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="ProjectCode" label="项目编码" width="120"></el-table-column>
          <el-table-column prop="ProjectName" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ProjectNote" label="项目说明" show-overflow-tooltip></el-table-column>
          <el-table-column prop="EPS_ID" label="所属部门" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
          <el-table-column prop="ProjectPlanStart" label="计划开始时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ProjectPlanFinish" label="计划结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ProjectStatus" label="项目状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="CreatPerson" label="创建人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="CreateTime" label="创建时间" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="tbar" style="margin:0 25%;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="新建项目" :visible.sync="isAddShow" :close-on-click-modal="false" width="75%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col span="7">
            <el-form-item label="项目编号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="7">
            <el-form-item label="项目名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
           <el-col span="7">
            <el-form-item label="所属部门">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

        </el-row>
          
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  SearchProjects,
} from "@/api/ProjectInfoApi";
export default {
  data() {
    return {
      projectListData: [],
      multipleSelection: [],
      isAddShow: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    newOne() {
      this.isAddShow = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    SearchProjectList(){

      SearchProjects()
        .then(res => {
            this.projectListData=res.data;
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning",
          });
        });
    }
  }
};
</script>

<style scoped >
.pagePanel {
  width: 100%;
  height: 100%;
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
.contentPanel .tbar {
}
</style>
