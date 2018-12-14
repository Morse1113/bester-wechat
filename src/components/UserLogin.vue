<template>
  <div class="user-login">
    <img class="background" src="../assets/login-background.png"/>
    <div class="form">
      <p><input class="phone" type="text" placeholder="手机号码" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"
                required="required" v-model="phoneNum"/></p>
      <p><input class="verify-code" type="text" placeholder="验证码" maxlength="6"
                onkeyup="value=value.replace(/[^\d]/g,'')" required="required" v-model="verifyCode"/>
        <button class="verify-send" @click="sendVerifyCode()">获取验证码</button>
      </p>
      <button class="verify-phone" @click="userLogin()">登录/注册</button>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from "mint-ui";
  import {service} from "../js/api";
  import app from '../main.js'

  export default {
    name: 'UserLogin',
    data() {
      return {
        phoneNum: '',
        verifyCode: ''
      }
    },
    beforeCreate() {
      service('get', '/user/isLogin', {}).then(response => {
        if (response.code === 200 && response.data) {
          app.$router.replace('/user-info');
        }
      })
    },
    methods: {
      sendVerifyCode: function () {
        if (!this.phoneNum.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
          MessageBox('提示', '请输入正确的手机号！');
          return
        }
        service('get', '/user/verificationCode', {
          phoneNum: this.phoneNum
        }).then(response => {
          MessageBox('提示', response.code === 200 ? '发送成功，请查看您的手机' : response.message);
        })
      },
      userLogin: function () {
        service('post', '/user/verification', {
          phoneNum: this.phoneNum,
          code: this.verifyCode
        }).then(response => {
          if (response.code !== 200) {
            MessageBox('提示', response.message);
            return
          }
          app.$router.replace('/user-info');
        })
      }
    }
  }
</script>

<style scoped>
  .user-login {
    height: 100%;
    width: 100%;
  }

  .background {
    position: absolute;
    z-index: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .form {
    position: relative;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 40%;
    width: 70%;
  }

  .verify-send {
    float: right;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    height: 30px;
    width: 110px;
    outline: none;
    border: none;
    font-size: 15px;
    z-index: auto;
    color: black;
  }

  .verify-phone {
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 50px;
    height: 50px;
    width: 210px;
    outline: none;
    border: none;
    font-size: 20px;
    z-index: auto;
    color: white;
    position: relative;
    top: 30px;
  }

  input {
    margin: auto;
    height: 32px;
    font-size: 18px;
    background: none;
    border-style: none;
    outline: none;
    color: #c79f67;
  }

  .form p {
    text-align: left;
    text-indent: 10px;
    padding: 10px;
    border-bottom: 1px solid;
    border-color: #c79f67;
    color: #c79f67;
    font-size: 1.1rem;
    font-weight: lighter;
  }

  .verify-code {
    width: 40%;
  }

  ::-webkit-input-placeholder {
    color: #c79f67;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #c79f67;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: #c79f67;
  }

  :-ms-input-placeholder {
    color: #c79f67;
  }
</style>
