<template>
  <div class="pagePanel">
    <div class="buttonPanel">
      <el-button size="mini" @click="HandRootAdd" type="primary">新建</el-button>
      <el-button size="mini" type="primary">导入</el-button>
    </div>
    <div class="contentPanel">
      <div class="content">
        <el-table
          :data="DeptsData"
          style="width: 100%;margin-bottom: 0px;"
          row-key="id"
          border
          default-expand-all
          height="100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="DEPT_NAME" label="部门名称"></el-table-column>
          <el-table-column prop="DEPT_NO" label="部门编号" width="100"></el-table-column>
          <el-table-column prop="DEPT_NOTE" label="说明"></el-table-column>
          <el-table-column prop="CREATER" label="创建人" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.CREATER | user_filter }}</span>
                </template>
          </el-table-column>
          <el-table-column prop="CREATE_TIME" label="创建时间"  :formatter="dateFormat"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="HandAddChildTask(scope.$index, scope.row)">新增子节点</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

          <!-- <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
        </el-table>
      </div>
    </div>

    <el-dialog title="新建部门" :visible.sync="isDialogShow" :close-on-click-modal="false" width="20%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="部门编号">
          <el-input v-model="formData.DEPT_NO"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="formData.DEPT_NAME"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="formData.DEPT_NOTE"></el-input>
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
GetDeptsI,
addDeptI,
DeleteDeptI,
UpdateDeptI
} from "@/api/Depts";
import { notice } from "@/assets/js/notice";
const BeforEditData ={};
export default {
  data() {
    return {
      DeptsData: [],
      isDialogShow: false,
      handType: "add",
      formData: {
        DEPT_NO: "",
        DEPT_NAME: "",
        PDEPT_NO: "",
        DEPT_NOTE: "",
        CREATER: "",
        CREATE_TIME: ""
      }
    };
  },

  mounted() {
    this.GetDepts();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    HandRootAdd() {
      this.formData = {
         PDEPT_NO:0,
         CREATER: this.$store.state.userInfo["0"].UserID,
         CREATE_TIME:new Date()
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    HandAddChildTask(index,row){
      this.formData = {
        PDEPT_NO:row.DEPT_NO,
        CREATER: this.$store.state.userInfo["0"].UserID,
        CREATE_TIME:new Date()
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    GetDepts() {
      GetDeptsI().then(res => {
        this.DeptsData = res.data;
      });
    },
    handleEdit(index, row) {
      this.BeforEditData=Object.assign({}, row)
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
    },
    handleDelete(index, row) {
      DeleteDeptI(row).then(res => {
        notice("删除成功");
        this.GetDepts();
      });
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        addDeptI(this.formData).then(res => {
          notice("新增成功");
          this.isDialogShow = false;
           this.GetDepts();
        });
      }
      if (this.handType === "edit") {
        this.formData.UpdateColumns=this.array_diff(this.BeforEditData,this.formData)
        UpdateDeptI(this.formData).then(res => {
          notice("更新成功");
          this.isDialogShow = false;
        this.GetDepts();
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
