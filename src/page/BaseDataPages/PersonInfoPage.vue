<template>
  <div class="pagePanel">
    <div class="buttonPanel">
      <el-button size="medium" @click="Add" type="primary">新建</el-button>
      <el-button size="medium"  type="primary">导入</el-button>
    </div>
    <div class="contentPanel">
      <el-table
        ref="Table"
        :data="PersonsListData"
        height="100%"
        tooltip-effect="dark"
        style="width: 100%;"
      >
        <el-table-column prop="PERSON_NO" label="员工编号" width="100"></el-table-column>
        <el-table-column prop="NAME" label="员工姓名" width="100"></el-table-column>
        <el-table-column prop="SEX" label="性别" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.SEX | sex_filter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DEPT_NO" label="部门">
             <template slot-scope="scope">
          <span>{{ scope.row.DEPT_NO | DEPT_filter }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="MAJOR" label="专业" width="150"></el-table-column>
        <el-table-column prop="MAJOR_ClASS" label="专业类型"  width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.MAJOR_ClASS | MAJOR_ClASS_filter }}</span>
          </template>
        </el-table-column>
         <el-table-column prop="Note" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加人员" :visible.sync="isDialogShow" :close-on-click-modal="false" width="20%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="员工编号">
          <el-input v-model="formData.PERSON_NO"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="formData.NAME"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.SEX">
            <el-radio label="men">男</el-radio>
            <el-radio label="women">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员部门" >
          <el-select v-model="formData.DEPT_NO" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in DEPT_OPTION"
              :key="item.DEPT_NO"
              :label="item.DEPT_NAME"
              :value="item.DEPT_NO"
              :disabled="item.disabled"
           
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select v-model="formData.STATUS" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in STATUSOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
           <el-form-item label="专业">
          <el-input v-model="formData.MAJOR"></el-input>
        </el-form-item>
          <el-form-item label="专业类别">
            <el-select v-model="formData.MAJOR_ClASS" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in MAJOR_ClASSOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.Note"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  NewPersons,
  DeletePerson,
  SearchPersons,
  UpdatePersons
} from "@/api/PersonInfoApi";
import { mapState } from 'vuex';
import { notice } from "@/assets/js/notice";
const BeforEditData = {};
export default {
  data() {
    return {
      PersonsListData: [],
      isDialogShow: false,
      handType: "add",
      formData: {
        PERSON_NO: "",
        NAME: "",
        SEX: "",
        DEPT_NO: "",
        Note: "",
        STATUS: "",
        MAJOR: "",
        MAJOR_ClASS: ""
      }
    };
  },
   computed: {
        ...mapState({
          DEPT_OPTION: state => state.Depts.DeptsInfo,
          MAJOR_ClASSOptions: state => state.MAJOR_ClASSOptions,
          STATUSOptions: state => state.STATUSOptions
          
        })
    },
  mounted() {
    this.SearchPersonsMethod();
  },
  methods: {
    SearchPersonsMethod() {
      SearchPersons()
        .then(res => {
          this.PersonsListData = res.data;
        })
    },
    Add() {
      this.formData = {};
      this.handType = "add";
      this.isDialogShow = true;
    },
    handleDelete(index, row) {
      DeletePerson(row)
        .then(res => {
          notice("删除成功");
          this.SearchPersonsMethod();
        })
    },
    handleEdit(index, row) {
      this.BeforEditData=Object.assign({}, row)
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewPersons(this.formData)
          .then(res => {
            notice("保存成功");
            this.isDialogShow = false;
            this.SearchPersonsMethod();
          })
      }
      if (this.handType === "edit") {
        this.formData.UpdateColumns=this.array_diff(this.BeforEditData,this.formData)
        UpdatePersons(this.formData)
          .then(res => {
            notice("更新成功");
            this.isDialogShow = false;
            this.SearchPersonsMethod();
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
