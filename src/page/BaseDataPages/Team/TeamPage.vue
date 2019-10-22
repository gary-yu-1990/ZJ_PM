<template>
  <div class="contains">
    <div class="toolbar">
      <el-button type="primary"  @click="handleOBSSearch">组织结构查询</el-button>
      <el-button type="primary"  @click="HandAddRootOBS">新增组织结构</el-button>
    </div>
    <div class="WbsTaskView" style="height:500px;">
      <el-card class="box-card" v-if="iswbsviewShow">
        <el-table
          :data="obsData"
          style="width: 100%;margin-bottom: 0px;"
          row-key="id"
          border
          default-expand-all
          height="100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @row-dblclick="handRowDblClick"
        >
          <el-table-column prop="OBSName" label="组织名称" width="200"></el-table-column>
          <el-table-column prop="OBS_ID" label="负责人"></el-table-column>
          <el-table-column prop="WBSStatus" label="状态"  width="120"></el-table-column>
          <el-table-column prop="OBSRemark" label="备注"></el-table-column>
          <el-table-column prop="CreatePerson" label="创建人"></el-table-column>
          <!-- <el-table-column prop="CreateTime" label="创建时间"></el-table-column> -->
          <el-table-column label="操作" width="300">
            <template slot-scope="scope"> 
              <el-button icon="el-icon-plus" circle @click="HandAddChildTask(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-setting" circle  @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-minus" circle  @click="handleDelete(scope.$index, scope.row)"></el-button>
              <el-button icon="el-icon-s-promotion" circle  @click="handleRelease(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="taskDetailInfo">
      <el-tabs type="border-card" style="height:100%;">
        <el-tab-pane label="活动详情">活动详情</el-tab-pane>
      </el-tabs>
    </div>
    
    <el-dialog title="新增组织结构" :visible.sync="isDialogShow" :close-on-click-modal="false" width="50%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-row>
          <el-col :span=11>
            <el-form-item label="组织名称">
              <el-input v-model="formData.OBSName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=11>
            <el-form-item label="负责人">
              <el-input v-model="formData.OBS_ID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=11>
            <el-form-item label="状态">
              <el-input v-model="formData.WBSStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=11>
            <el-form-item label="备注">
              <el-input v-model="formData.OBSRemark"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span=11>
            <el-form-item label="创建人">
              <el-input v-model="formData.CreatePerson"></el-input>
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
import loacalDataJson from "@/store/data.json";
// import treegantt from "@/components/tree-gantt/tree-gantt.vue";
import {SearchProjects} from "@/api/ProjectInfoApi";
import {GetWBSData,NewProjectTask,UpdateProjectTask,DeleteTask} from "@/api/WBSApi";
export default {
  data() {
    return {
      obsData:[],
      isDialogShow: false,
      handType: "add",
      formData: {
        OBS_ID: "",
        OBSName: "",
        OBSRemark: "",
        CreatePerson: "",
        OBSStatue:""     
      }
    };
  },
  // components: {
  //   treegantt
  // },

  methods: {
     handRowDblClick(row,column,event){
       this.formData = {
        OBS_PID:row.OBS_ID
        //OBSCode:this.Projectvalue
      };
      this.handType = "add";
      this.isDialogShow = true;
     },

     HandAddRootOBS(){
     this.formData = {
        OBS_PID:0
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
     HandAddChildOBS(index,row){
      this.formData = {
        WBS_PID:row.WBS_ID
      };
      this.handType = "add";
      this.isDialogShow = true;
    },
    handleEdit(index, row) {
      this.handType = "edit";
      this.formData = row;
      this.isDialogShow = true;
    },
    handleDelete(index, row) {
      DeleteOBS(row)
        .then(res => {
             this.GetOBSData();
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    ProjectChange(){
       this.GetOBSData();
    },
    GetOBSData(){
        this.then(res => {
             this.OBSData=res.data;
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning"
          });
        });
    },
    handleOBSSearch(){
        this.getOBSData();
              this.$store.dispatch('GET_USERS').then(() => {
                    });
                    this.$store.state
    },
    submitForm() {
      //判断是新增还是编辑更新
      if (this.handType === "add") {
        NewOBS(this.formData)
          .then(res => {
                 this.$message({
                   message:'保存成功',
                   duration:3000,
                   });
            this.isDialogShow = false;
            this.getOBSData();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
      if (this.handType === "edit") {
        UpdateOBS(this.formData)
          .then(res => {
            this.$alert(`更新成功`, "提示", {
              type: "warning",
            });
            this.isDialogShow = false;
            this.getOBSData();
          })
          .catch(err => {
            this.$alert(`${err.msg}`, "提示", {
              type: "warning",
              confirmButtonText: "好的"
            });
          });
      }
    },

  }
};
</script>

<style>
.contains {
  margin: 5px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.WbsTaskView {
  height: 100%;
  flex: 1;
  border: 1px solid #eee;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  /* background-color: #E9EEF3 */
}
.taskDetailInfo {
  height: 200px;

  /* clear: left; */
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

.el-table{
  height: 100%;
  margin-bottom: 0px;
  overflow: auto;
}
.el-table__body-wrapper{
    height: 100%;
}



</style>
