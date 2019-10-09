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
.contentPanel .tbar {
}
</style>
