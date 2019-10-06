 <template>
  <el-container>
    <el-header height="60px" style="text-align: left; font-size: 20px">
      <i class="text_class">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
        <el-dropdown>
          <el-button type="primary">
            添加成员
            <i class="el-icon-circle-plus-outline"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>通过邮箱邀请</el-dropdown-item>
            <el-dropdown-item>下载批量导入成员模板</el-dropdown-item>
            <el-dropdown-item>山川文件批量导入成员</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </i>

      <li
        style="color:blue; margin-top:10px ;margin-right: 10px;  display: block; float: right;  font-size: 20px"
      >****队</li>
    </el-header>

    <el-main>
      <el-table :data="tableData" stripe="true" height="800px">
        <el-table-column prop="name" label="姓名" width="140"></el-table-column>
        <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
        <el-table-column prop="emailed" label="邮箱"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container {
  position: absolute;
  top: 2px;
  left: 10px;
 
  height: 600px;
  align-self: auto;
}

.el-header {
  background-color: rgb(212, 212, 212);
  align-self: auto;
}

.el-table {
  position: absolute;
  top: 62px;
  left: 0px;
  right: 0px;
  bottom: 5px;
  align-self: auto;
}

.text_class {
  margin-top: 10px;
  margin-left: 10px;
  display: block;
  float: left;
}
</style>


<script>
export default {
  data() {
    const item = {
      name: "王小虎",
      telephone: "123546789",
      emailed: "132454@qq.com"
    };
    return {
      tableData: Array(8).fill(item)
    };
  }
};
</script>