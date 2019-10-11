<template>
  <div class="pagePanel">
    <!-- <div class="filterPanel">
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
    </div>-->
    <div class="buttonPanel">
      <el-button size="medium" @click="Add" type="primary">新建</el-button>
      <el-button size="medium" @click="Delete" type="primary">批量删除</el-button>
      <el-button size="medium" type="success" @click="Search">查询</el-button>
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
          @
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
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleTask(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tbar" style="margin:0 25%;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="新建项目" :visible.sync="isAddShow" :close-on-click-modal="false" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col span="11">
            <el-form-item label="项目编号">
              <el-input v-model="form.ProjectCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="11">
            <el-form-item label="项目名称">
              <el-input v-model="form.ProjectName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="所属部门">
              <el-input v-model="form.EPS_ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="11">
            <el-form-item label="项目状态">
              <el-input v-model="form.ProjectStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item prop="ProjectPlanStart" label="开始时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.ProjectPlanStart"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="11">
            <el-form-item prop="ProjectPlanFinish" label="结束时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.ProjectPlanFinish"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="创建人">
              <el-input v-model="form.CreatPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="11">
            <el-form-item label="创建时间">
              <el-input v-model="form.CreateTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="项目说明" prop="ProjectNote">
              <el-input type="textarea" v-model="form.ProjectNote"></el-input>
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
import {
  NewProjects,
  DeleteLists,
  SearchProjects,
  UpdateProject,
  getCurrentPageData,
} from "@/api/ProjectInfoApi";
export default {
  data() {
    return {
      projectListData: [],
      multipleSelection: [],
      limit: 10,
      count: 0,
      currentPage: 1,
      isAddShow: false,
      handType: "add",
      form: {
        ProjectCode: "",
        ProjectName: "",
        EPS_ID: "",
        ProjectStatus: "",
        ProjectPlanStart: "",
        ProjectPlanFinish: "",
        CreatPerson: "土豆土豆",
        CreateTime: "",
        ProjectNote: ""
      }
    };
  },

  methods: {
    SearchProjectsMethod() {
      SearchProjects()
        .then(res => {
          this.projectListData = res.data;
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    Add() {
      this.form = {};
      this.handType = "add";
      this.isAddShow = true;
    },
    Search() {
      this.getPagesData();
    },
    Delete() {
      DeleteLists(this.multipleSelection)
        .then(res => {
            this.getPagesData();
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    handleTask(index, row) {
      this.$router.push({
        path: "/ProjectManagerPages/ProjectTask"
      }); //利用路由跳转页面，path为你定义的路由配置中要跳转页面的path
    },
    handleEdit(index, row) {
      this.handType = "edit";
      this.form = row;
      this.isAddShow = true;
    },
    handleDelete(index, row) {
      var deleteArry = [];
      deleteArry.push(row);
      DeleteLists(deleteArry)
        .then(res => {
          this.SearchProjectsMethod();
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewProjects(this.form)
          .then(res => {
                 this.$message({
                   message:'保存成功',
                   duration:1000,
                   type: 'success'
                   });
            this.isAddShow = false;
           this.getPagesData();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
      if (this.handType === "edit") {
        UpdateProject(this.form)
          .then(res => {
            this.$alert(`更新成功`, "提示", {
              type: "warning",
            });
            this.isAddShow = false;
            this.SearchProjectsMethod();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val){
          this.limit = val;
          this.currentPage = 1;
          this.getPagesData();
    },
    handleCurrentChange(val){
           this.currentPage = val;
           this.getPagesData();
    },
    getPagesData(){
       let data = {
        limit: this.limit,
        page: this.currentPage,
      };
      //新后台
      getCurrentPageData(data).then(res => {
        this.count = res.count;
        this.projectListData = [];
        this.projectListData = res.data;
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
</style>
