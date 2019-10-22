<template>
  <div class="pagePanel">
    <div class="buttonPanel">
      <el-button size="medium" @click="newOne" type="primary">新建</el-button>
      <el-button size="medium" type="success" @click="searchBankList()">查询</el-button>
      <el-button size="medium" type="warning">删除</el-button>
    </div>

    <div class="contentPanel">
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="tableData"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="teamName" label="团队名称" width="120"></el-table-column>
          <el-table-column label="建立时间" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>

          <el-table-column prop="responsiblePeople" label="负责人" width="120"></el-table-column>
          <el-table-column prop="member" label="组员" width="120"></el-table-column>
          <el-table-column prop="teamintroduction" label="团队介绍" show-overflow-tooltip></el-table-column>
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
    <div>
        <el-card class="box-card" v-if="iswbsviewShow">
        <el-table
          :data="taskData"
          style="width: 100%;margin-bottom: 0px;"
          row-key="id"
          border
          default-expand-all
          height="100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @row-dblclick="handRowDblClick"
        >
          <el-table-column prop="WBSName" label="任务名称" width="300"></el-table-column>
          <el-table-column prop="WBSRemark" label="任务说明"></el-table-column>
          <el-table-column prop="WorkingTime" label="工期(天)"  width="80"></el-table-column>
          <el-table-column prop="OBS_ID" label="负责人"></el-table-column>
          <el-table-column prop="WBSStatus" label="任务状态"  width="120"></el-table-column>
          <el-table-column prop="WBSExpectStart" label="计划开始时间"  :formatter="dateFormat" ></el-table-column>
          <el-table-column prop="WBSExpectFinish" label="计划结束时间" :formatter="dateFormat" ></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },

        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        },
        {
          teamName: "软件开发组",
          date: "2016-05-03",
          responsiblePeople: "王小虎"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
