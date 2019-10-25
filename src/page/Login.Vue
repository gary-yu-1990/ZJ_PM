

<template>
  <div class="loginBody">
    <div class="loginMain">
      <!-- 登录框头部--图标 -->
      <div class="mainLogoWrap">
        <img
          class="mainLogo"
          width="100%"
          src="../assets/zjlogo.png"
          alt
        />
      </div>
      <div class="mainInfo">
        <h1>知匠项目管理系统</h1>
        <div class="loginBar"></div>
        <div class="info">
          <p>账号:</p>
          <el-input
            style="width:300px;"
            placeholder="请输入账号"
            v-model="cid"
          >
            <img
              slot="prefix"
              src="../assets/img/cid.png"
              width="22"
              margin-left="10px"
              alt
            />
          </el-input>
        </div>
        <div class="info">
          <p>密码:</p>
          <el-input
            type="password"
            style="width:300px;"
            placeholder="请输入密码"
            v-model="password"
          >
            <img
              slot="prefix"
              src="../assets/img/password.png"
              width="22"
              alt
            />
          </el-input>
        </div>
        <div
          class="submit"
          @click="loginSubmit"
        >登录</div>
      </div>
    </div>
    <div class="loginTitle">
      <p>-佛山知匠科技有限公司-</p>
    </div>
  </div>
</template>



<script> 
/*  
import Co  o kies f rom "js-cookie";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      cid: "", //用户账号
      password: "" //用户密码
    };
  },
  mounted() {},
  methods: {
    loginSubmit() {
      if (this.cid === "" || this.password === "") {
        alert("不能为空");
      } else if (this.cid !== "admin" && this.password !== "123") {
        alert("帐户名或密码不正确");
      } else {
        this.$router.push({
          path: "/Main"
                   }); //利用路由跳转页面，path为你定义的路由配置中要跳转页面的path
      }
    }
  }
};
*/

import Cookies from "js-cookie";
import { UserLogin } from "@/api/UsersInfoApi" ; 
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import { notice } from '@/assets/js/notice'

export default {
  name: "Login",
  data() {
    return {
      cid: "", //用户账号
      password: "" //用户密码
    };
  },
  methods: {
    //...mapMutations("navTabs", ["emptyTabList"]),
    loginSubmit() {
      if (this.cid === "") {
        notice("请输入用户名！","warning")
        return;
      }
      if (this.password === "") {
       notice("请输入密码！","warning")
        return;
      }
      if (this.cid == "admin" && this.password == "123") {
        this.$router.push({
          path: "/Main"
        });
      }else {
        let obj = {
          Cid: this.cid,
          PassWord: this.password
        };
        UserLogin(obj)
          .then(res => {
            //方法执行完毕，传回数据之后，执行以下代码
            if (res.data.stopped == 1) {
              notice("账户被禁用无法登陆","warning")
              return;
            }
            this.$store.dispatch("Init_Store");
            this.$store.dispatch("SET_LOGGED", res.data);
            // this.$store.dispatch("GET_Depts");
            // this.$store.dispatch("GET_Persons");
            this.$router.push({
                path: "/Main"
              });
          }) 
      }
     } 
  },
  created () {} 
};
</script>



<style scoped>
.info {
  text-align: center;
  font-size: 1em;

  margin: 0px !important;
  padding: 0;
}
.submit {
  user-select: none;
  margin: 3.6rem auto 0;
  width: 327px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  background-color: #82bc00;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.loginBody {
  width: 100%;
  height: 100%;
  background: url("../assets/img/back.png");
  background-size: cover;
}
.loginTitle {
  width: 16.9%;
  position: fixed;
  bottom: 3.5%;
  right: 2%;
}
.loginTitle p {
  size: 20;
  color: #fff;
}
.loginMain {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27em;
  height: 30em;
  background-color: #fff;
  box-shadow: 4px 2px 20px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-size: 15px;
}
.mainLogoWrap {
  width: 6.5em;
  position: relative;
  margin: 0 auto;
}
.mainLogo {
  position: relative;
  top: -3.25em;
}
.mainInfo {
  position: relative;
  top: -3em;
  background-color: #ffffff;
}
.mainInfo h1 {
  text-align: center;
  font-size: 1.65em;
  color: #333;
  font-weight: 400;
}
.loginBar {
  width: 19em;
  height: 3px;
  border-radius: 50%;
  background-color: #6084e7;
  margin: 20px auto 0;
}
.info {
  margin-top: 1.3em;
  text-align: center;
  font-size: 1em;
}
.info p {
  padding: 0px 0 10px 50px;
  text-align: left;
  margin: 10px;
}
.info img {
  margin: 8px 0;
}
.submit {
  user-select: none;
  margin: 3.2rem, 3rem, 3rem, 1rem;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  background-color: #6084e7;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>


