<template>
  <div class="container">
    <div class="info-container">
      <div>
        <p><img src="../assets/1.png" alt="">会籍：<span class="vip-level">{{vipLevel}}</span>
          <button class="btn btn-sm heijin-btn" @click="bgShow=true">&nbsp;黑金会籍&nbsp;</button>
        </p>
        <p><img src="../assets/2.png" alt="">姓名：<span class="user-name">{{userName}}</span></p>
        <p><img src="../assets/3.png" alt="">电话：<span class="user-phone">{{phone}}</span></p>
        <p><img src="../assets/4.png" alt="">身份证号：<span class="user-identity">{{identityId}}</span></p>
        <p><img src="../assets/12.png" alt="">代金券：<span class="user-identity">{{voucherAmount}}</span>
          <button class="btn btn-sm voucher-btn" @click="voucherShow=true">&nbsp;充值&nbsp;</button>
        </p>
        <button class="logout" @click="logout()">退出登录</button>
      </div>
    </div>

    <!--黑金会籍绑定输入框-->
    <div class="card-input" v-show="bgShow">
      <img class="input-background" src="../assets/input-bg.png">
      <p>
        <img class="input-left" src="../assets/left.png">
        <span>黑金会籍注册通道</span>
        <img class="input-right" src="../assets/right.png">
      </p>
      <p class="bg-input">
        <input class="bg-card" type="text" placeholder="卡号" maxlength="12" required="required" v-model="blackGoldCard"/>
        <input class="bg-pwd" type="text" placeholder="卡密" maxlength="8" required="required" v-model="blackGoldPwd"/>
        <button class="heijin-bind" @click="bindBgCard()">激活黑金会籍</button>
      </p>
      <img class="level-img" src="../assets/level.png"/>
      <img class="close-img" src="../assets/close.png" @click="bgShow=false"/>
    </div>

    <!--代金券充值输入框-->
    <div class="card-input" v-show="voucherShow">
      <img class="input-background" src="../assets/input-bg.png">
      <p><img class="input-left" src="../assets/left.png">
        <span>代金券充值</span>
        <img class="input-right" src="../assets/right.png">
      </p>
      <p class="bg-input">
        <input class="voucher-card" type="text" placeholder="卡号" maxlength="16" required="required" v-model="voucherCard"/>
        <button class="voucher-bind" @click="bindVoucherCard()">立即充值</button>
      </p>
      <img class="close-img" src="../assets/close.png" @click="voucherShow=false"/>
    </div>
  </div>
</template>

<script>
  import {service} from "../js/api";
  import {MessageBox} from "mint-ui";
  import {Toast} from 'mint-ui';
  import app from "@/main";
  import $ from 'jquery'

  export default {
    name: 'UserInfo',
    data() {
      return {
        vipLevel: '',
        userName: '实名认证暂未开放',
        phone: '',
        identityId: '实名认证暂未开放',
        voucherAmount: '',
        bgShow: false,
        voucherShow: false,
        blackGoldCard: '',
        blackGoldPwd: '',
        voucherCard: ''
      }
    },
    created () {
      this.userInfoDetail();
    },
    mounted () {
      const height = window.innerHeight;
      if (height > 800) {
        $('.card-input p').css({"top": "37%"});
        $('.heijin-bind').css({"top": "40%"});
      }
      const deviceHeight = document.documentElement.clientHeight + "px";
      $('input').on("click", function () {
        console.log(deviceHeight);
        $("body").attr("style", "height:" + deviceHeight + "px");
      });
    },
    methods: {
      userInfoDetail: function() {
        service('get', '/user/detail', {}).then(response => {
          if (response.code !== 200) {
            MessageBox('提示', response.message);
            return;
          }
          const data = response.data;
          if (data.vipLevel === 10) {
            this.vipLevel = '黑金会籍';
          } else {
            this.vipLevel = '白银会籍';
          }
          this.phone = data.phone;
          this.voucherAmount = data.voucherAmount > 0 ? data.voucherAmount : '无'
        })
      },
      bindBgCard: function () {
        if (this.blackGoldCard.length < 12) {
          Toast("请输入正确的卡号！");
          return
        }
        if (this.blackGoldPwd.length < 8) {
          Toast("请输入正确的卡密！");
          return
        }
        service('post', '/blackGold/bind', {
          cardId: this.blackGoldCard,
          password: this.blackGoldPwd
        }).then(response => {
          MessageBox('提示', response.message);
          if (response.code === 200) {
            this.bgShow = false;
            this.userInfoDetail();
          }
        })
      },
      bindVoucherCard: function () {
        service('post', '/voucher/bind', {
          cardId: this.voucherCard,
        }).then(response => {
          MessageBox('提示', response.message);
          if (response.code === 200) {
            this.voucherShow = false;
            this.userInfoDetail();
          }
        })
      },
      logout: function () {
        service('post', '/user/logout', {}).then(response => {
          Toast('退出成功');
          app.$router.replace('/user-login');
        })
      }
    }
  }
</script>

<style scoped>

  .container {
    height: 100%;
    width: 100%;
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-position: center 100%;
  }

  .heijin-btn {
    float: right;
    margin-top: -5px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 15px;
  }

  .voucher-btn {
    float: right;
    margin-top: -5px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 15px;
  }

  .info-container {
    position: relative;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 30%;
    width: 90%;
  }

  .info-container img {
    display: inline;
    float: left;
    margin-left: 3px;
    margin-right: 3px;
    width: 25px;
  }

  .card-input {
    position: fixed;
    margin: 0 auto;
    top: 28%;
    width: 76%;
    height: 100%;
    left: 0;
    right: 0;
    font-size: 15px;
    color: #78482F;
  }

  .card-input span {
    font-family: 思源黑体,fantasy;
    color: #78482F;
    font-weight: bold;
  }

  .input-background {
    width: 100%;
  }

  .card-input p {
    position: fixed;
    margin: 0 auto;
    top: 41%;
    left: 0;
    right: 0;
  }

  .input-left {
    width: 8%;
  }

  .input-right {
    width: 8%;
  }

  input {
    margin: auto;
    border-style: none;
    outline: none;
    background-color: #c79f67;
  }

  .bg-input {
    width: 100%;
    height: 30%;
  }

  .bg-card {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 50%;
    top: 20%;
  }

  .bg-pwd {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 50%;
    top: 22%;
  }

  .heijin-bind {
    position: relative;
    display: block;
    margin: 0 auto;
    top: 48%;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 16px;
    width: 40%;
    height: 15%;
  }

  .level-img {
    position: relative;
    left: 0;
    right: 0;
    top: -60px;
    width: 80%;
  }

  .voucher-card {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 50%;
    top: 50px;
    height: 30px;
  }

  .voucher-bind {
    position: relative;
    display: block;
    margin: 0 auto;
    top: 150px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 16px;
    width: 40%;
    height: 15%;
  }

  .close-img {
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 8%;
  }

  .info-container p {
    text-align: left;
    text-indent: 10px;
    padding: 10px;
    border-bottom: 1px solid;
    border-color: #c79f67;
    color: #c79f67;
    font-size: 16px;
    font-weight: lighter;
  }

  .footer-container div {
    padding-right: 5%;
    height: 30%;
  }

  .footer-container div:first-child {
    text-align: right;
    border-right: 1px solid;
    border-color: black;
  }

  .logout {
    position: relative;
    display: block;
    margin: 0 auto;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 16px;
    width: 40%;
    height: 15%;
  }

  ::-webkit-input-placeholder {
    color: #78482F;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #78482F;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: #78482F;
  }

  :-ms-input-placeholder {
    color: #78482F;
  }
</style>
