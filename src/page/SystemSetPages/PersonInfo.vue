  <template>
  <el-container>
    <el-header style="height：70px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'G:\资料\做项目\VueProjects\ZJ_PM\src\page\MyTask.vue' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="G:\资料\做项目\VueProjects\ZJ_PM\src\page\SystemSet.vue">基础设置</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-h2 padding-left="20px;">用户设置</el-h2>
        <el-input
          type="text"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input1"
          style="width:200px;margin-left:20px;"
        ></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
        <el-button type="primary">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    </el-header>

    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        height="670px"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="150"></el-table-column>
        <el-table-column prop="password" label="密码" width="150"></el-table-column>
        <el-table-column prop="department" label="部门" width="150"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top: 20px;margin-left:900px;">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      //tableData: Array(5).fill(item),
      tableData: [
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "主次梁",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小二",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "张小兵",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "朱松平",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "周围解",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "李伟杰",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          userName: "wxh",
          password: "123",
          department: "工程部",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],

      input1: "",
      textarea: "",
      text: "",
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
.el-container {
  padding: 0;
  margin: 0;
}
.el-header {
  width: 100%;
  height: 80px !important;
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: left;
  margin-right: 150px;
  line-height: 60px;
  font-size: 20px;
  z-index: 9999;
  top: 0px;
  position: absolute;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-main {
  padding: 0px;
  width: 100%;
  padding-bottom: 160px;

  padding-top: 80px;
  height: 100%;
}

.el-table {
  padding: 0px;
  height: 600px;
}
.el-footer {
  padding: 0px;
  height: 160px;
  width: 100%;
  bottom: 0px;
  position: fixed;
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: left;
  margin-right: 150px;
  font-size: 20px;
  position: fixed;
  overflow: auto;
}
.el-tabs {
  width: 100%;
  padding: 0px;
  bottom: 0px;
  height: 550px;
  position: fixed;
}
</style>
