<template>
<div class="df jc_c ai_c vh background">
<div>
    <el-card >
  <div slot="header" class="tex" style="font-weight: 800;">
    <span >欢迎来到小爱后台管理系统</span>
  </div>
  <div style="width:600px;">
    <el-form :model="form" label-width="100px" status-icon :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item> -->
     <div class="mb mt">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
        <div class="df jc_c"><el-button type="primary"  @click="login">登录</el-button></div>
    </el-form>
  </div>
</el-card>
</div>
</div>



  
</template>

<script>
// import {createNamespacedHelpers} from 'vuex'
// const userMndule = createNamespacedHelpers('user')
// const {mapState: userState,mapActions:userActions} = userMndule
export default {
  name: "",
  props: {},
  components: {},
  data() {
    // let validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.form.checkPass !== "") {
    //       this.$refs.form.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // let validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.form.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      form: {
        username: "",
        password: "",
        // email: "",
        // checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "用户名在2~8位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        //   { validator: validatePass, trigger: "blur" },
          { min: 6, max: 15, message: "密码在6~15位", trigger: "blur" }
        ],
        
        // email: [
        //   { required: true, message: "邮箱不能为空", trigger: "blur" },
        //   { type: "email", message: "请输入正确邮箱", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    login() {
      this.$store.dispatch('user/postlogin',{
          username:this.form.username,
          password:this.form.password
      })
      this.form.password=''
      this.form.username=''
    }
  },
  mounted() {},
  watch: {},
  computed: {
    //   ...userState
  }
};
</script>

<style scoped lang='scss'>
.background{
    background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1969517060,2299225493&fm=26&gp=0.jpg');
    background-size:cover ;
    background-repeat: no-repeat;
}
</style>