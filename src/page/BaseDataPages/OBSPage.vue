<template>
  <div class="contains">
    <div class="toolbar">
      <el-button size="mini" type="primary" @click="HandAddRootOBS">新增</el-button>
    </div>
    <div class="OBScontent">
      <div class="OBSPanel">
        <el-table
          :data="obsData"
          style="width:100%;margin-bottom:0px;"
          row-key="id"
          border
          default-expand-all
          height="100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @row-click="handOBSRowClick"
        >
          <el-table-column prop="OBSName" label="组织名称"></el-table-column>
          <el-table-column prop="OBS_Type" label="组织类型" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.OBS_Type | OBS_Type_filter }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="OBSRemark" label="备注" width="150"></el-table-column>
          <el-table-column label="操作" width="380">
            <template slot-scope="scope">
              <el-button size="mini" @click="HandAddChildOBS(scope.$index, scope.row)">新增子节点</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="handleUserDeal(scope.$index, scope.row)" v-if="scope.row.OBS_Type!='person'">人员维护</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="OBSMemerPanel">
        <el-table
          ref="Table"
          :data="OBSMemerData"
          height="100%"
          border
          tooltip-effect="dark"
          style="width: 100%;"
        >
          <el-table-column prop="EmployeeCode" label="用户名称" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.EmployeeCode | person_filter }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="OBSName" label="组织" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"  @click="handleOBSMemerDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- OBS新增窗口 -->
    <el-dialog
      title="新增项目组织结构"
      :visible.sync="isDialogShow"
      :close-on-click-modal="false"
      width="20%"
    >
      <el-form ref="form11" :model="formData" label-width="80px">
        <el-form-item label="组织类型">
          <el-select
            v-model="formData.OBS_Type"
            placeholder="请选择"
            @change="OBS_TypeChangClick"
            style="width:100%"
          >
            <el-option
              v-for="item in OBS_TypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="组织名称">
          <el-input v-model="formData.OBSName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.OBSRemark" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 部分门选择窗口 -->
    <el-dialog
      title="企业组织结构"
      :visible.sync="isDeptDialogShow"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="DeptWindow" height="100%">
        <div class="DataPanel">
          <el-table
            :data="DeptsData"
            style="width: 100%;margin-bottom: 0px;"
            row-key="id"
            border
            default-expand-all
            height="100%"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column prop="DEPT_NAME" label="部门名称" width="300"></el-table-column>
            <el-table-column prop="DEPT_NO" label="部门编号" width="100"></el-table-column>
            <el-table-column prop="DEPT_NOTE" label="说明"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDeptSelect(scope.$index, scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <!-- 人员选择窗口 -->
    <el-dialog
      title="人员信息"
      :visible.sync="isUserDialogShow"
      :close-on-click-modal="false"
      v-bind:width="userDialogWith"
    >
      <div class="UserWindow" height="100%"  style="width: 100%;">
        <div class="DataPanel"  style="width: 100%;">
          <el-table
            ref="userTable"
            :data="userListData"
            height="100%"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="UserID" label="用户ID" width="150"></el-table-column>
            <!-- <el-table-column prop="UserName" label="用户昵称" width="150"></el-table-column> -->
            <el-table-column prop="EmployeeCode" label="员工名称" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.EmployeeCode | person_filter }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="Cid" label="帐户名" width="120"></el-table-column> -->
            <el-table-column prop="UserStatus" label="用户状态" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.UserStatus | UserStatus_filter }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="UserPhone" label="手机号" width="150"></el-table-column> -->
            <!-- <el-table-column prop="UserEmail" label="用户邮箱" width="200"></el-table-column>  -->
            <el-table-column v-if="isSingleSelect" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleUserSelect(scope.$index, scope.row)">选择</el-button>
              </template>
            </el-table-column>

            <!-- <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>-->
          </el-table>
        </div>
      </div>
      <div style="text-align: center; margin:3px 0">
        <el-button
          size="mini"
          type="primary"
          v-if="!isSingleSelect"
          @click="SaveSelectUesrs"
          style="display: inline-block;"
        >保存选项</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetOBSDataI,
  NewOBS,
  UpdateOBS,
  DeleteOBS,
  GetOBSMemberI,
  SaveOBSMemberI,
  DeleteOBSMemerI
} from "@/api/OBSApi";
import { SearchUsers } from "@/api/UsersInfoApi";
import { mapState } from "vuex";
import { notice } from "@/assets/js/notice";
import { GetDeptsI } from "@/api/Depts";
import Vue from 'vue'
const BeforEditData = {};
export default {
  data() {
    return {
      multipleSelection: [],
      obsData: [],
      OBSMemerData: [],
      DeptsData: [],
      userListData: [],
      OBSNamedisabled: false,
      isUserDialogShow: false,
      isDialogShow: false,
      isDeptDialogShow: false,
      isSingleSelect:false,
      handType: "add",
      currentObsRow: "", //当前选择的OBS行
      formData: {
        OBSCode:"",
        OBS_ID: "",
        OBS_Type: "",
        OBS_PID: "",
        OBSCode: "",
        OBSName: "",
        OBSStatue: "",
        OBSRemark: "",
        CreatePerson: ""
      }
    };
  },
  computed: {
    ...mapState({
      OBS_TypeOptions: state => state.OBS_TypeOptions
    }),
    userDialogWith:function () {
        if(this.isSingleSelect)
        {
          return '35%';
        }
        else{
          return '30%';
        }
    },
  },
  mounted() {
    GetDeptsI().then(res => {
      this.DeptsData = res.data;
    });
    SearchUsers().then(res => {
      this.userListData = res.data;
    });
    this.GetOBSData();
  },
  methods: {
    SaveSelectUesrs() {
      let data = {
        oBS_ID: this.currentObsRow.OBS_ID,
        keyOBS_ID: this.currentObsRow.KeyOBS_ID,
        users: this.multipleSelection,
        creater: this.$store.state.userInfo["0"].UserID
      };
      SaveOBSMemberI(data).then(res => {
        notice("新增人员成功！");
        this.isUserDialogShow = false;
        let data = {
          OBS_ID: this.currentObsRow.OBS_ID,
        };
        GetOBSMemberI(data).then(res => {
          this.OBSMemerData = res.data;
        });
      });
    },
    handleSelectionChange(val) {
      if(this.isSingleSelect)
      {
           if(val.length>0){
               this.$refs.userTable.clearSelection();
               this.$refs.userTable.toggleRowSelection(val.pop())
           }
           else
           {
              this.multipleSelection = val.pop();
           }
      }
      else
      {
         this.multipleSelection = val;
      }
    },
    handleUserDeal(index, row) {
      this.currentObsRow = row;
      if(row.OBS_Type=="person"||row.OBS_Type=="role")
      {
        this.isSingleSelect=true;
      }
      else
      {
        this.isSingleSelect=false;
      }
      this.isUserDialogShow = true;
    },

    OBS_TypeChangClick(newValue) {
      if (newValue == "dept") {
        this.isDeptDialogShow = true;
        // this.OBSNamedisabled = true;
      }
      if (newValue == "group") {
        this.OBSNamedisabled = false;
        // this.formData.OBSName = "";
      }
      if (newValue == "role") {
        notice("此功能待完善", "warning");
        this.OBSNamedisabled = true;
      }
      if (newValue == "person") {
        this.OBSNamedisabled = true;
        this.isSingleSelect=true;
        this.isUserDialogShow = true; //打开人员选择框！
        this.$nextTick(function () {
              this.$refs.userTable.clearSelection();
        })
  
      }
    },

    handleDeptSelect(index, row) {
      this.formData.OBSName = row.DEPT_NAME;
      this.formData.OBSCode = row.DEPT_NO;
      this.isDeptDialogShow = false;
    },

    handleUserSelect(index, row) {
      //根据编码找到人名
      var name= Vue.filter("person_filter")(row.EmployeeCode)
      this.formData.OBSName = name;
      this.formData.OBSCode = row.UserID;
      this.isUserDialogShow = false;
    },

    handOBSRowClick(row, column, event) {
      //查找当前节点下面所有人员
      let data = {
        OBS_ID: row.OBS_ID
      };
      GetOBSMemberI(data).then(res => {
        this.OBSMemerData = res.data;
      });
    },

    HandAddRootOBS() {
      this.formData = {
        OBS_PID: 0
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    HandAddChildOBS(index, row) {
      this.formData = {
        OBS_PID: row.OBS_ID,
        KeyOBS_ID:row.KeyOBS_ID
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    handleEdit(index, row) {
      this.BeforEditData = Object.assign({}, row);
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
    },
    handleDelete(index, row) {
      DeleteOBS(row).then(res => {
        notice("删除OBS成功");
        this.GetOBSData();
      });
    },
    handleOBSMemerDelete(index, row) {
      DeleteOBSMemerI(row).then(res => {
        notice("删除成员成功");
        this.OBSMemerData.splice(index, 1);
      });
    },
    ProjectChange() {
      this.GetObsData();
    },
    GetOBSData() {
      GetOBSDataI().then(res => {
        this.obsData = res.data;
      });
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewOBS(this.formData).then(res => {
          notice("保存成功！");
          this.isDialogShow = false;
          this.GetOBSData();
        });
      }
      if (this.handType === "edit") {
        this.formData.UpdateColumns = this.array_diff(
          this.BeforEditData,
          this.formData
        );
        UpdateOBS(this.formData).then(res => {
          notice("更新成功！");
          this.isDialogShow = false;
          this.GetOBSData();
        });
      }
    }
  }
};
</script>
<style>
.contains {
  /* margin: 5px 0; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.OBScontent {
  height: 100%;
  width: 100%;
  flex: 1;
  /* margin: 5px 0 0 0; */
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  overflow: hidden;
  

  /* background-color: #E9EEF3 */
}
selector::-webkit-scrollbar{
width:0;
}

.OBSPanel {
  height: 100%;
  flex: 1;
}
.OBSMemerPanel {
  height: 100%;
  width: 30%;
  display: flex;
}

.box-card {
  flex: 1;
  padding: 0;
  overflow: auto;
}

.box-card .el-card__body {
  padding: 0;
  height: 100%;
  overflow: auto;
}

.el-table {
  height: 100%;
  margin-bottom: 0px;
  overflow: auto;
}
.el-table__body-wrapper {
  height: 100%;
}
</style>

