 <template>
  <el-container>
    <el-header height="60px" style="text-align: left; font-size: 20px">
      <i class="text_class">
        <el-button type="primary">
          <i class="el-icon-circle-plus-outline"></i>
            增加成员
        </el-button>
      </i>
      <li
        style="color:blue; margin-top:10px ;margin-right: 10px;  display: block; float: right;  font-size: 20px"
      >共50人</li>
    </el-header>

    <el-main>
      <el-table :data="tableData" stripe="true" height="800px">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="140"></el-table-column>
        <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
        <el-table-column prop="emailed" label="邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row) "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>


<style scoped>
.el-container {
  position: absolute;
  top: 20px;
  left: 0px;
  right: 20px;
  height: 500px;
}

.el-header {
  background-color: rgb(212, 212, 212);
}

.el-table {
  position: absolute;
  top: 60px;
  left: 0px;
  right: 10px;
  bottom: 5px;
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
      tableData: Array(30).fill(item)
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>