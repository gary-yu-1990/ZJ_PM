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
          :data="roleListData"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="RoleID" label="角色编码" width="150"></el-table-column>
          <el-table-column prop="RoleName" label="角色名" width="150"></el-table-column>
          <el-table-column prop="Describe" label="角色描述" width="150"></el-table-column>

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

    <el-dialog title="新建角色" :visible.sync="isAddShow" :close-on-click-modal="false" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col span="11">
            <el-form-item label="角色编号">
              <el-input v-model="form.RoleID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="角色名称">
              <el-input v-model="form.RoleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="角色描述">
              <el-input type="textarea" v-model="form.Describe"></el-input>
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
  NewRoles,
  DeleteLists,
  SearchRoles,
  UpdateRole
} from "@/api/RolesInfoApi";
export default {
  data() {
    return {
      roleListData: [],
      multipleSelection: [],
      isAddShow: false,
      handType: "add",
      form: {
        RoleID: "",
        RoleName: "",
        Describe: ""
      }
    };
  },

  methods: {
    SearchRolesMethod() {
      SearchRoles()
        .then(res => {
          this.roleListData = res.data;
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
      this.SearchRolesMethod();
    },
    Delete() {
      DeleteLists(this.multipleSelection)
        .then(res => {
          this.SearchRolesMethod();
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
          this.SearchRolesMethod();
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
        NewRoles(this.form)
          .then(res => {
            this.$alert(`保存成功`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
            this.isAddShow = false;
            this.SearchRolesMethod();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
      if (this.handType === "edit") {
        UpdateRole(this.form)
          .then(res => {
            this.$alert(`更新成功`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
            this.isAddShow = false;
            this.SearchRolesMethod();
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
