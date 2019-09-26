    <template>
  <div>
    <div class="info">
      <p>账号:</p>
      <el-input style="width:327px;" placeholder="请输入账号" v-model="cid"></el-input>
    </div>
    <div class="info">
      <p>密码:</p>
      <el-input type="password" style="width:327px;" placeholder="请输入密码" v-model="password"></el-input>
    </div>
    <div class="submit" @click="log">登录</div>
  </div>
</template>

    <script>
import Cookies from "js-cookie";
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
    log() {
      if (this.cid === "" || this.password === "") {
        alert("不能为空");
      } else if (this.cid !== "admin" && this.password !== "123") {
        alert("帐户名或密码不正确");
      } else {
        this.$router.push({
          path: "/ProjectManager"
        }); //利用路由跳转页面，path为你定义的路由配置中要跳转页面的path
      }
    }
  }
};
</script>

<style scoped>
.info {
  margin-top: 1.3em;
  text-align: center;
  font-size: 1em;
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
</style>