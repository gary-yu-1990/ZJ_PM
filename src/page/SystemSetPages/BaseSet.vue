<template >
  <el-container>
    <el-header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: 'G:\资料\做项目\VueProjects\ZJ_PM\src\page\MyTask.vue' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="G:\资料\做项目\VueProjects\ZJ_PM\src\page\SystemSet.vue">基础设置</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>权限设置</el-breadcrumb-item>
      </el-breadcrumb>
      <el-h2 padding-left="20px;">权限设置</el-h2>
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
    </el-header>
    <el-main>
      <el-table 
      :data="tableData" 
      height="670px" 
      padding="0px"  
      ref="multipleTable"      
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
       <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="150"></el-table-column>
        <el-table-column prop="department" label="部门" width="150"></el-table-column>
        <el-table-column prop="permission" label="权限" width="150">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="middle">查看</el-button>
            <el-button type="text" size="middle">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div style="margin-top: 20px;margin-left:900px;">
       
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    goBack() {
      console.log("go back");
    },
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
  },
  data() {
    const item = {
      userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"
    };
    return {
      //tableData: Array(50).fill(item),
      tableData: [{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},{ userName: "wxh",
      password: "123",
      department: "工程部",
      name: "王小虎",
      permission: "管理员"},],
      options: [
        {
          value: "选项1",
          label: "系统管理员"
        },
        {
          value: "选项2",
          label: "总经理"
        },
        {
          value: "选项3",
          label: "项目经理"
        },
        {
          value: "选项4",
          label: "包工头"
        },
        {
          value: "选项5",
          label: "普工"
        }
      ],
      value: "管理员",
      textarea: ""
    };
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
  top: 60px;
  position: fixed;
  overflow: auto;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-main {
  padding: 0px;
  width: 100%;
  padding-bottom: 160px;
  overflow: auto;
  padding-top: 80px;
}

.el-table {
  padding: 0px;

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
  height: 210px;

  position: fixed;
}
</style>
