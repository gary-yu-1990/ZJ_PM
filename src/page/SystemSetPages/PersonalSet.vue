<template>
  <el-container>
    <el-aside>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>

      <el-aside style="width:200px;height:100%;">
        <el-menu router :default-active="activeIndex">
        <el-menu-item index="/SystemSetPages/Base">
            <el-li style="padding: 0px;">
              <i class="el-icon-user"></i>用户设置
            </el-li>
          </el-menu-item>
        <el-menu-item index="/SystemSetPages/Base">
            <el-li>
              <i class="el-icon-menu"></i>权限设置
            </el-li>
          </el-menu-item>
          <el-menu-item index="/SystemSetPages/Base">
            <el-li>
              <i class="el-icon-setting"></i>密码设置
            </el-li>
          </el-menu-item>
          <el-menu-item index="/SystemSetPages/Base">
            <el-li>
              <i class="el-icon-setting"></i>个人设置
            </el-li>
          </el-menu-item>
         <el-menu-item index="/SystemSetPages/Base">
            <el-li>
              <i class="el-icon-user"></i>系统设置
            </el-li>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon-setting" margin-right="15px">用户密码</i>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer>
        <button>关闭</button>
      </el-footer>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      },

      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("修改成功!");
        } else {
          console.log("密码提交错误!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped >
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 40px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  text-align: center;
  left: 0px;
  border: 0;
  display: block;
  height: 100%;
  width: 100%;
  background-color: rgb(230, 238, 232);
}
</style>