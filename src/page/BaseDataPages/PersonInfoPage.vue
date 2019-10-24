<template>
  <div class="pagePanel">
    <div class="buttonPanel">
      <el-button size="medium" @click="Add" type="primary">新建</el-button>
      <el-button size="medium" @click="Search" type="success">查询</el-button>
      <el-button size="medium"  @click="Delete" type="warning">删除</el-button>
    </div>

    <div class="contentPanel">
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="PersonsListData"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          @
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="PERSON_NO" label="人员编号" width="120"></el-table-column>
          <el-table-column prop="NAME" label="姓名" width="120"></el-table-column>         
          <el-table-column prop="SEX" label="性别" width="120"></el-table-column>
          <el-table-column prop="DEPT_NO" label="部门" width="120"></el-table-column>
         
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
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
  <el-dialog title="添加人员" :visible.sync="isAddShow" :close-on-click-modal="false" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col span="11">
            <el-form-item label="人员编号">
              <el-input v-model="form.PERSON_NO"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="11">
            <el-form-item label="姓名">
              <el-input v-model="form.NAME"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="11">
            <el-form-item label="性别">
              <el-input v-model="form.SEX"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="11">
            <el-form-item label="部门">
              <el-input v-model="form.DEPT_NO"></el-input>
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
import { NewPersons, DeleteLists, SearchPersons,UpdatePersons } from "@/api/PersonInfoApi";
export default {
  data() {
    return {
      PersonsListData: [],
      multipleSelection: [],
      isAddShow: false,
      handType: "add",
      form: {
        PERSON_NO: "",
        NAME: "",
        SEX: "",
        DEPT_NO: ""
             
      }
    };
  },

  methods: {
    SearchPersonsMethod() {
      SearchPersons()
        .then(res => {
          this.PersonsListData = res.data;
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
      this.SearchPersonsMethod();
    },
    Delete() {
      DeleteLists(this.multipleSelection)
        .then(res => {
          this.SearchPersonsMethod();
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    handleEdit(index, row) {
      this.handType = "edit"
      this.form = row;
      this.isAddShow = true;
    },
    handleDelete(index, row) {
      var deleteArry = [];
      deleteArry.push(row);
      DeleteLists(deleteArry)
        .then(res => {
          this.SearchPersonsMethod();
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
        NewPersons(this.form)
          .then(res => {
            this.$alert(`保存成功`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
            this.isAddShow = false;
            this.SearchPersonsMethod();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
      if(this.handType === "edit")
      {
        UpdatePersons(this.form)
          .then(res => {
            this.$alert(`更新成功`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
            this.isAddShow = false;
            this.SearchPersonsMethod();
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
}

.contentPanel .content {
  overflow: auto;
  flex: 1;
}

</style>
