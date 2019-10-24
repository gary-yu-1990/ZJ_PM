<template>
  <div class="pagePanel">
    <div class="buttonPanel">
      <el-button size="medium" @click="Add" type="primary">新建</el-button>
    </div>
    <div class="contentPanel">
        <el-table
          ref="Table"
          :data="userListData"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%;"
        >
          <el-table-column prop="UserName" label="用户昵称" width="150"></el-table-column>
          <el-table-column prop="EmployeeCode" label="用户名称" width="150">
             <template slot-scope="scope">
                  <span>{{ scope.row.EmployeeCode | person_filter }}</span>
             </template>
          </el-table-column>
          <el-table-column prop="Cid" label="帐户名" width="120"></el-table-column>
          <el-table-column prop="PassWord" label="密码" width="150"></el-table-column>
          <el-table-column prop="UserStatus" label="用户状态" width="100">
            <template slot-scope="scope">
                  <span>{{ scope.row.UserStatus | UserStatus_filter }}</span>
             </template>
          </el-table-column>
          <el-table-column prop="UserPhone" label="手机号" width="150"></el-table-column>
          <el-table-column prop="UserEmail" label="用户邮箱" width="200"></el-table-column>
          <el-table-column prop="UserNote" label="用户备注" width="150"></el-table-column>
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

    <el-dialog title="新建账户" :visible.sync="isDialogShow" :close-on-click-modal="false" width="20%">
      <el-form ref="form" :model="formData" label-width="90px">
         <el-form-item label="用户名称">
           <el-select v-model="formData.EmployeeCode" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in PersonsInfo_OPTION"
              :key="item.PERSON_NO"
              :label="item.NAME"
              :value="item.PERSON_NO"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="formData.UserName"></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="formData.Cid"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="formData.PassWord"></el-input>
        </el-form-item>
       
        <el-form-item label="用户状态">
          <el-radio-group v-model="formData.UserStatus">
            <el-radio label="qy">启用</el-radio>
            <el-radio label="jy">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input v-model="formData.UserNote"></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="formData.UserPhone"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formData.UserEmail"></el-input>
        </el-form-item>
        <el-form-item >
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
import { notice } from "@/assets/js/notice";
const BeforEditData ={};
export default {
  data() {
    return {
      userListData: [],
      isDialogShow: false,
      handType: "add",
      formData: {
        UserID: "",
        UserName: "",
        Cid: "",
        PassWord: "",
        EmployeeCode: "",
        NAME: "",
        UserStatus: "",
        UserNote: "",
        UserSource: "",
        UserPhone: "",
        UserEmail: ""
      }
    };
  },
 mounted() {
    this.SearchUsersMethod();
  },
   computed: {
        ...mapState({
         PersonsInfo_OPTION: state => state.Persons.PersonsInfo,
        })
    },
  methods: {
    SearchUsersMethod() {
      SearchUsers()
        .then(res => {
          this.userListData = res.data;
        })
    },
    Add() {
      this.formData = {
        UserStatus:'qy'
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    Delete() {
      DeleteLists(this.multipleSelection)
        .then(res => {
          this.SearchUsersMethod();
        })
    },
    handleEdit(index, row) {
      this.BeforEditData=Object.assign({}, row)
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
    },
    handleDelete(index, row) {
      var deleteArry = [];
      deleteArry.push(row);
      DeleteLists(deleteArry)
        .then(res => {
          notice('删除成功')
          this.SearchUsersMethod();
        })
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewUsers(this.formData)
          .then(res => {
            notice('新增成功')
            this.isDialogShow = false;
            this.SearchUsersMethod();
          })
      }
      if (this.handType === "edit") {
        this.formData.UpdateColumns=this.array_diff(this.BeforEditData,this.formData)
        UpdateUser(this.formData)
          .then(res => {
            notice('更新成功')
            this.isDialogShow = false;
            this.SearchUsersMethod();
          })
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
