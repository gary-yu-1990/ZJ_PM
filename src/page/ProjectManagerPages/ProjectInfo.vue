<template>
  <el-container class="main-container">
    <div class="pageWrapper">
      <el-aside width="210px">
        <el-menu :default-active="activeIndex">
          <el-menu-item-group>
            <template slot="title">
              <li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">项目</li>
            </template>
            <el-menu-item>
              <i class="el-icon-s-custom"></i>全部项目
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-user-solid"></i>我创建的项目
            </el-menu-item>
            <!-- <el-menu-item >
            <i class="el-icon-menu"></i>我参与的项目
            </el-menu-item>-->
            <el-menu-item>
              <i class="el-icon-eleme"></i>已归档项目
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <li style="color:blue; margin-right: 2px;  display: block;  font-size: 20px">分组</li>
            </template>

            <!-- <div style="margin-left: 20px;  display: block ">
            <el-button size="mini" type="primary" icon="el-icon-plus" style="left:20px">创建</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" style="left:20px">排序</el-button>
          </div>
          <el-menu-item index="/TeamPages/TeamInfo">
            <i class="el-icon-s-flag"></i>ERP软件开发
          </el-menu-item>
          <el-menu-item index="/TeamPages/TeamInfo">
            <i class="el-icon-s-flag"></i>APS排产队
          </el-menu-item>
          <el-menu-item index="/TeamPages/TeamInfo">
            <i class="el-icon-s-flag"></i>财务组
            </el-menu-item>-->
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <div class="pagePanel">
        <div class="buttonPanel">
          <el-button size="medium" @click="Add" type="primary">新建</el-button>
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
              @row-dblclick="handRowdDblClick"
            >
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column prop="ProjectCode" label="项目编码" width="120"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="ProjectNote" label="项目说明" show-overflow-tooltip></el-table-column>
              <el-table-column prop="EPS_ID" label="所属部门"  width="80"  show-overflow-tooltip></el-table-column>
              <!-- <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>-->
              <el-table-column prop="ProjectPlanStart" label="计划开始时间"    width="110"    :formatter="dateFormat" show-overflow-tooltip></el-table-column>
              <el-table-column prop="ProjectPlanFinish" label="计划结束时间"   width="110"      :formatter="dateFormat" show-overflow-tooltip></el-table-column>
              <el-table-column prop="ProjectStatus" label="项目状态" width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.ProjectStatus | ProjectStatus_filter }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="CreatPerson" label="创建人" width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.CreatPerson | person_filter }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="CreateTime"
                label="创建时间"
                :formatter="dateFormat"
                 width="110"  
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleTask(scope.$index, scope.row)">详情</el-button>
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
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
              <el-col :span="11">
                <el-form-item label="项目编号">
                  <el-input v-model="form.ProjectCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="项目名称">
                  <el-input v-model="form.ProjectName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="所属部门">
                  <el-input v-model="form.EPS_ID"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="项目状态">
                  <el-select v-model="form.ProjectStatus" placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in ProjectStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item prop="ProjectPlanStart" label="开始时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.ProjectPlanStart"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
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
            <!-- <el-row>
            <el-col :span="11">
              <el-form-item label="创建人">
                <el-input v-model="form.CreatPerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="创建时间">
                <el-input v-model="form.CreateTime"></el-input>
              </el-form-item>
            </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="22">
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
    </div>
  </el-container>
</template>

<script>
import {
  NewProjects,
  DeleteLists,
  SearchProjects,
  UpdateProject,
  getCurrentPageData
} from "@/api/ProjectInfoApi";
import { mapState } from "vuex";
import { notice } from '@/assets/js/notice'
const BeforEditData ={};
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
      activeIndex: "1",
      form: {
        ProjectCode: "",
        ProjectName: "",
        EPS_ID: "",
        ProjectStatus: "unstart",
        ProjectPlanStart: "",
        ProjectPlanFinish: "",
        CreatPerson: "",
        CreateTime: "",
        ProjectNote: ""
      }
    };
  },
  computed: {
    ...mapState({
      ProjectStatusOptions: state => state.ProjectStatusOptions
    })
  },
  mounted() {
    this.getPagesData();
  },
  methods: {
    SearchProjectsMethod() {
      SearchProjects().then(res => {
        this.projectListData = res.data;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handRowdDblClick(row, column, event) {
      this.$store.dispatch("SET_ProjectID", row.ProjectCode);
      this.$router.push({
        path: "/ProjectManagerPages/ProjectDash"
      });
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
      this.BeforEditData=Object.assign({}, row)
      this.isAddShow = true;
    },
    handleDelete(index, row) {
      var deleteArry = [];
      deleteArry.push(row);
      DeleteLists(deleteArry)
        .then(res => {
          notice("删除成功", 'success')
          this.SearchProjectsMethod();
        })
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        this.form.CreatPerson = this.$store.state.userInfo["0"].UserID;
        this.form.CreateTime = new Date();
        NewProjects(this.form)
          .then(res => {
            notice("保存成功", 'success')
            this.isAddShow = false;
            this.getPagesData();
          })
      }
      if (this.handType === "edit") {
        this.form.UpdateColumns=this.array_diff(this.BeforEditData,this.form)
        UpdateProject(this.form)
          .then(res => {
             notice("更新成功", 'success')
            this.isAddShow = false;
            this.SearchProjectsMethod();
          })
      
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.getPagesData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPagesData();
    },
    getPagesData() {
      let data = {
        limit: this.limit,
        page: this.currentPage
      };
      //新后台
      getCurrentPageData(data).then(res => {
        this.count = res.count;
        this.projectListData = [];
        this.projectListData = res.data;
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
