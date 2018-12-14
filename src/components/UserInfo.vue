<template>
  <div class="container">
    <img class="background" src="../assets/bg.png"/>
    <div class="info-container">
      <div>
        <p><img src="../assets/1.png" alt="">会籍：<span class="vip-level">{{vipLevel}}</span>
          <button class="btn btn-sm heijin-btn" @click="blackGold()">&nbsp;黑金会籍&nbsp;</button>
        </p>
        <p><img src="../assets/2.png" alt="">姓名：<span class="user-name">{{userName}}</span></p>
        <p><img src="../assets/3.png" alt="">电话：<span class="user-phone">{{phone}}</span></p>
        <p><img src="../assets/4.png" alt="">身份证号：<span class="user-identity">{{identityId}}</span></p>
        <p><img src="../assets/12.png" alt="">代金券：<span class="user-identity">{{voucherAmount}}</span>
          <button class="btn btn-sm voucher-btn" @click="voucher()">&nbsp;充值&nbsp;</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {service} from "../js/api";
  import {MessageBox} from "mint-ui";

  export default {
    name: 'UserInfo',
    data() {
      return {
        vipLevel: '',
        userName: '',
        phone: '',
        identityId: '',
        voucherAmount: ''
      }
    },
    created () {
      service('get', '/user/detail', {}).then(response => {
        if (response.code !== 200) {
          MessageBox('提示', response.message);
          return;
        }
        const data = response.data;
        this.vipLevel = data.vipLevel === 10 ? '黑金会籍' : '白银会籍';
        this.userName = data.userName;
        this.phone = data.phone;
        this.identityId = data.identityId;
        this.voucherAmount = data.voucherAmount > 0 ? data.voucherAmount : '无'
      })
    },
    methods: {
      blackGold: function() {
        alert("黑金")
      },
      voucher: function () {
        alert("充值")
      }
    }
  }
</script>

<style scoped>

  .background {
    position: absolute;
    z-index: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .heijin-btn {
    float: right;
    margin-top: -5px;
    background-color: #DAA24B;
    font-weight: lighter;
    border-radius: 15px;
    outline: none;
    border: none;
    color: black;
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
    color: black;
    font-size: 15px;
  }

  .info-container {
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 30%;
    width: 80%;
  }

  .info-container img {
    display: inline;
    float: left;
    margin-left: 3px;
    margin-right: 3px;
    width: 25px;
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
</style>
