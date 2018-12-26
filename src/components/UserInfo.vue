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
      </div>
    </div>

    <!--黑金会籍绑定输入框-->
    <img class="input-background" src="../assets/input-bg.png" v-show="bgShow">
    <div class="card-input" v-show="bgShow">
      <p>
        <img class="sides" src="../assets/left.png">
        <span>黑金会籍注册通道</span>
        <img class="sides" src="../assets/right.png">
      </p>
      <p class="input-class">
        <input type="text" placeholder="卡号" maxlength="12" required="required" v-model="blackGoldCard"/>
      </p>
      <p class="input-class">
        <input type="text" placeholder="卡密" maxlength="8" required="required" v-model="blackGoldPwd"/>
      </p>
      <button class="submit-btn" @click="bindBgCard()">激活黑金会籍</button>
      <img class="close-img" src="../assets/close.png" @click="bgShow=false, closeInput()"/>
    </div>

    <!--代金券充值输入框-->
    <img class="input-background" src="../assets/input-bg.png" v-show="voucherShow">
    <div class="card-input" v-show="voucherShow">
      <p class="title">
        <img class="sides" src="../assets/left.png">
        <span>代金券充值</span>
        <img class="sides" src="../assets/right.png">
      </p>
      <p class="voucher-card">
        <input type="text" placeholder="卡号" maxlength="16" required="required" v-model="voucherCard"/>
      </p>
      <button class="submit-btn" @click="bindVoucherCard()">立即充值</button>
      <img class="close-img" src="../assets/close.png" @click="voucherShow=false, closeInput()"/>
    </div>
  </div>
</template>

<script>
  import {service} from "../js/api";
  import {MessageBox} from "mint-ui";
  import {Toast} from 'mint-ui';
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
      const deviceHeight = document.documentElement.clientHeight + "px";
      $('input').on("click", function () {
        console.log(deviceHeight);
        $("html body .container").height(deviceHeight);
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
      closeInput: function () {
        window.onload = self;
      }
    }
  }
</script>

<style scoped>

  .container {
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-position: center 100%;
  }

  .heijin-btn {
    float: right;
    margin-top: -5px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 16px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 16px;
  }

  .voucher-btn {
    float: right;
    margin-top: -5px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 16px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 16px;
  }

  .info-container {
    position: relative;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    width: 85%;
  }

  .info-container img {
    display: inline;
    float: left;
    margin-left: 3px;
    margin-right: 3px;
    width: 25px;
  }

  .input-background {
    position: absolute;
    margin:auto;
    top:50%;
    transform: translateY(-50%);
    right:0;
    bottom:0;
    left:0;
    width: 300px;
    font-size: 16px;
    color: #78482F;
  }

  .card-input {
    position: absolute;
    margin:auto;
    top:50%;
    transform: translateY(-50%);
    right:0;
    bottom:0;
    left:0;
    height: 280px;
    font-size: 16px;
    color: #78482F;
  }

  .sides {
    position: relative;
    width: 30px;
    top: 7px;
  }

  .card-input span {
    font-family: 思源黑体,fantasy;
    color: #78482F;
    font-weight: bold;
  }

  input {
    border-style: none;
    outline: none;
    background-color: #c79f67;
    height: 28px;
    width: 200px;
    border-radius: 5px;
  }

  .input-class {
    height: 20px;
  }

  .submit-btn {
    position: relative;
    display: block;
    margin: 0 auto;
    top: 60px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 40px;
    outline: none;
    border: none;
    color: #78482F;
    font-size: 18px;
    width: 160px;
    height: 40px;
  }

  .voucher-card {
    position: relative;
    top: 20px;
    height: 60px;
  }

  .close-img {
    position: relative;
    top: 100px;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 30px;
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
