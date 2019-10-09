<template>
  <el-container>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="模块名称">
        <el-input v-model="form.BigModule"></el-input>
      </el-form-item>
      <el-form-item label="数据库表名称">
        <el-input v-model="form.TableName"></el-input>
      </el-form-item>
      <el-form-item label="文件夹名称">
        <el-input v-model="form.ModuleName"></el-input>
      </el-form-item>
      <el-form-item label="生成类型">
        <el-checkbox-group v-model="form.typelist">
          <el-checkbox label="Model" name="typelist"></el-checkbox>
          <el-checkbox label="Service" name="typelist"></el-checkbox>
          <el-checkbox label="Control" name="typelist"></el-checkbox>
          <el-checkbox label="Dal" name="typelist"></el-checkbox>
          <el-checkbox label="vue_table" name="typelist"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即生成</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import {
  GenerateCode,
} from "@/api/developTool";
export default {
  data() {
    return {
      form: {
        BigModule: "",
        TableName: "",
        ModuleName:"",
        typelist: []
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.BigModule === "") {
        this.$alert("请输入模块名", "提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        return;
      }
      if (this.form.TableName === "") {
        this.$alert("请输入表名", "提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        return;
      }
       if (this.form.ModuleName === "") {
        this.$alert("请输入文件夹名", "提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        return;
      }
      let obj = {
        BigModule:this.form.BigModule,
        TableName: this.form.TableName,
        ModuleName:this.form.ModuleName,
        typelist: this.form.typelist
      };
      GenerateCode(obj)
        .then(res => {
             this.$alert(`传值成功`, "提示", {
            type: "warning",
            confirmButtonText: "好的"
          });
        })
        .catch(err => {
          this.$alert(`${err.msg}`, "提示", {
            type: "warning",
            confirmButtonText: "好的"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 100%;
  margin: 5px;
  border: 1px solid #e9eef3;
  height: 250px;
}
.el-form {
  height: 100%;
}
</style>
