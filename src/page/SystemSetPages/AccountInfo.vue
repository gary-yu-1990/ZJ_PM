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
      <el-button size="medium" @click="Add" type="primary">新建</el-button>
      <el-button size="medium" @click="Delete" type="primary">批量删除</el-button>
      <el-button size="medium" type="success" @click="Search">查询</el-button>
    </div>
    <div class="contentPanel">
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="userListData"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="UserID" label="用户编码" width="100"></el-table-column>
          <el-table-column prop="UserName" label="用户姓名" width="150"></el-table-column>
          <el-table-column prop="Cid" label="帐户名" width="100"></el-table-column>
          <el-table-column prop="PassWord" label="密码" width="120"></el-table-column>
          <el-table-column prop="EmployeeCode" label="工号" width="110"></el-table-column>
          <el-table-column prop="UserSex" label="性别" width="60"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

          <!-- <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
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

    <el-dialog title="新建账户" :visible.sync="isAddShow" :close-on-click-modal="false" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col span="11">
            <el-form-item label="用户编号">
              <el-input v-model="form.UserID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="用户名称">
              <el-input v-model="form.UserName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="11">
            <el-form-item label="帐户名">
              <el-input v-model="form.Cid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="11">
            <el-form-item label="密码">
              <el-input v-model="form.Password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="工号">
              <el-input v-model="form.EmployeeCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="性别">
              <el-input v-model="form.UserSex"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="margin-left: 240px;">
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  NewUsers,
  DeleteLists,
  SearchUsers,
  UpdateUser
} from "@/api/UsersInfoApi";
import Cookies from "js-cookie";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userListData: [],
      multipleSelection: [],
      isAddShow: false,
      handType: "add",
      form: {
        UserID: "",
        UserName: "",
        Cid: "",
        PassWord: "",
        EmployeeCode: "",
        UserSex: "女"
      }
    };
  },

  methods: {
    SearchUsersMethod() {
      SearchUsers()
        .then(res => {
          this.userListData = res.data;
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
      this.SearchUsersMethod();
    },
    Delete() {
      DeleteLists(this.multipleSelection)
        .then(res => {
          this.SearchUsersMethod();
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
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
          this.SearchUsersMethod();
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
        NewUsers(this.form)
          .then(res => {
            this.$alert(`保存成功`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
            this.isAddShow = false;
            this.SearchUsersMethod();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
      if (this.handType === "edit") {
        UpdateUser(this.form)
          .then(res => {
            this.$alert(`更新成功`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
            this.isAddShow = false;
            this.SearchUsersMethod();
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
