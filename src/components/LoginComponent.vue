<template>
  <div class="login_container">
    <div class="login_box">
      <div class="wai">
        <!--        头像区域-->
        <div class="avatar_box">
          <img src="../assets/cat.png" alt=""/>
        </div>
        <!--        登陆表单区域-->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
        >
          <!--          用户名-->
          <el-form-item prop="username">
            <el-input
                v-model="loginForm.username"
                prefix-icon="el-icon-user">
            </el-input>
          </el-form-item>
          <!--        密码-->
          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                prefix-icon="el-icon-key"
                type="password"
            ></el-input>
          </el-form-item>
          <!--        按钮区域-->
          <el-form-item class="btns">
            <el-button type="primary" @click="Login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login_container {
  background-color: #dddddd;
  height: 100%;
}

.login_box {
  width: 350px;
  height: 300px;
  background-color: white;
  border-radius: 15px;
  /*容器内居中*/
  position: absolute;
  left: 40%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    /*边框阴影*/
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #993d3d;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .wai {
    background-image: url("../assets/back.png");
    width: 577px;
    height: 300px;
    border-radius: 15px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      //数据绑定对象
      loginForm: {
        username: "root",
        password: "123456",
      },
      //验证规则对象
      loginFormRules: {
        //验证用户
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {
            min: 3,
            max: 10,
            message: "长度在3到10个字符",
            trigger: "blur"//
          },
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {
            min: 3,
            max: 15,
            message: "长度在3到15个字符",
            trigger: "blur"
          },
        ],
      },
    };
  },
  methods: {
    Login() {
      //预验证
      this.$refs.loginFormRef.validate(async (valid) => {
        //未验证通过直接return
        if (!valid) return;
        //不加await的话不会打印出数据，await只能用于async修饰的函数
        const response = await this.$http
            .post("pro/login", this.loginForm)
            .catch(() => this.$message.error("登陆失败."));
        //{data:res}解构，将得到的返回值的data解构为res
        console.log(response.data);
        //res的元数据中得到返回状态
        if (response.status !== 200) return;
        if (response.data.token) return this.$message.success("登陆成功");
        if (response.data.error)
          return this.$message.error(response.data.error);
      });
    },
    //重置登陆表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

