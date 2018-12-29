<template>
  <div id="max">
    <div id="head">
      <div id="title"><span id="realTitle">我的卡包</span></div>
      <div id="switch">
        <div id="status1" v-on:click="getCouponList(1)">已领取</div>
        <div id="status2" v-on:click="getCouponList(2)">已使用</div>
        <div id="status3" v-on:click="getCouponList(3)">已过期</div>
      </div>
    </div>
    <div id="userCoupon">
      <div class="coupon" v-for="coupon in couponList">
        <div class="left">
          <div class="leftOne" v-show="coupon.couponType==1">￥{{coupon.offerCash}}</div>
          <div class="leftOne" v-show="coupon.couponType==2">{{coupon.offerDiscount}}折</div>
          <div class="leftTwo">满{{coupon.threshold}}元可用</div>
        </div>
        <div class="right">
          <div class="rightOne"><span>{{coupon.couponName}}</span></div>
          <div class="rightTwo">
            <span v-show="status!=2">有效期至:{{buildDate(coupon.failureTime)}}</span>
            <span v-show="status==2">使用日期:{{buildDate(coupon.updateTime)}}</span>
            <span class="use" v-show="status==1">立即使用</span>
            <span class="use" v-show="status==2">已使用</span>
            <span class="use" v-show="status==3">已过期</span>
          </div>
          <div class="rightThree" v-show="status==1"><span
            v-on:click="getAlert(coupon.description)">使用规则 ></span></div>
          <div class="rightThree" v-show="status==2" v-on:><span>使用店铺:{{coupon.shopName}}</span></div>
          <div class="rightThree" v-show="status==3"><span>使用规则 ></span></div>
        </div>
      </div>
      <div class="isBlank" v-show="isBlank && status==1">您还没有优惠券，快去领券吧！</div>
      <div class="isBlank" v-show="!isBlank && status==1">到底了，没有更多了，快去使用吧!</div>
      <div class="isBlank" v-show="isBlank && status==2">您还没有使用过优惠券，快去领取使用吧！</div>
      <div class="isBlank" v-show="isBlank && status==3">空空如也！</div>
    </div>
  </div>
</template>

<script>
  import {service} from "../js/api";
  import $ from 'jquery'

  export default {
    name: "OwnCoupon",
    data() {
      return {
        couponList: null,
        status: 1,
        isBlank: true,
      }
    },
    mounted() {
      this.getCouponList(1);
    },
    methods: {
      getCouponList(status) {
        switch (status) {
          case 1:
            $("#userCoupon").removeClass()
            $("#userCoupon").addClass("userCouponOne")
            $("#status1").removeClass()
            $("#status1").addClass("statusColorOne");
            $("#status2").removeClass()
            $("#status2").addClass("statusColorTwo");
            $("#status3").removeClass()
            $("#status3").addClass("statusColorTwo");
            break;
          case 2:
            $("#userCoupon").removeClass()
            $("#userCoupon").addClass("userCouponTwo")
            $("#status2").removeClass()
            $("#status2").addClass("statusColorOne");
            $("#status1").removeClass()
            $("#status1").addClass("statusColorTwo");
            $("#status3").removeClass()
            $("#status3").addClass("statusColorTwo");
            break;
          case 3:
            $("#userCoupon").removeClass()
            $("#userCoupon").addClass("userCouponTwo")
            $("#status3").removeClass()
            $("#status3").addClass("statusColorOne");
            $("#status2").removeClass()
            $("#status2").addClass("statusColorTwo");
            $("#status1").removeClass()
            $("#status1").addClass("statusColorTwo");
            break;
        }

        this.status = status;
        service("get", "/coupon/status", {status: this.status}).then(response => {
          if (response.code !== 200) {
            this.couponList = null;
            return
          }
          this.isBlank = true
          this.couponList = response.data
          if (this.couponList) {
            this.isBlank = false
          }
        })
      },
      buildDate(time) {
        let date = new Date(time),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes()
        return year + '-' +
          (month < 10 ? '0' + month : month) + '-' +
          (day < 10 ? '0' + day : day) + ' ' +
          (hour < 10 ? '0' + hour : hour) + ':' +
          (min < 10 ? '0' + min : min)
      },
      getAlert(message) {
        window.alert(message);
      }
    }
  }
</script>

<style scoped>
  #max {
    width: 100%;
    font-family: 思源黑体;
    height: 100%;
  }

  #head {
    position: fixed;
    z-index: 1000;
    height: 15%;
    width: 100%;
  }

  #title {
    height: 50%;
    padding-top: 6%;
    width: 100%;
    line-height: 100%;
    background-color: #f2f2f2;
    color: black;
    font-size: 150%;
  }

  #switch {
    background-color: #f2faf2;
    height: 50%;
    width: 100%;

  }

  #status1 {
    margin-top: 1%;
    font-size: 100%;
    padding-top: 3%;
    height: 58%;
    width: 33.3%;
    color: black;
    float: left;
  }

  #status2 {
    margin-top: 1%;
    font-size: 100%;
    padding-top: 3%;
    height: 58%;
    width: 33.3%;
    color: black;
    float: left;
  }

  #status3 {
    margin-top: 1%;
    font-size: 100%;
    padding-top: 3%;
    height: 58%;
    width: 33.3%;
    color: black;
    float: right;
  }

  .coupon {
    margin-top: 3%;
    height: 15%;
    width: 92%;
    background-color: #f2f2f2;
  }

  .statusColorOne {
    background-color: #e0e0e0;
  }

  .statusColorTwo {
    background-color: #f2f2f2;
  }

  #userCoupon {
    padding-top: 32.5%;
    width: 100%;
    height: 80%;
  }

  #userCoupon .coupon {
    width: 100%;
    height: 20%;
  }

  .userCouponOne .coupon .left {
    color: #e6bd77;
  }

  .userCouponOne .coupon .right {
    color: black;
  }

  .userCouponTwo .coupon {
    color: #a8a8a8;
  }

  #userCoupon .coupon .left {
    float: left;
    width: 35%;
    height: 100%;
  }

  #userCoupon .coupon .right {
    float: left;
    width: 60%;
    height: 100%;
  }

  #userCoupon .coupon .left .leftOne {
    font-weight: bolder;
    padding-top: 20%;
    height: 30%;
    width: 100%;
    font-size: 200%;
  }

  #userCoupon .coupon .left .leftTwo {
    padding-top: 4%;
    font-size: 100%;
    width: 100%;
  }

  #userCoupon .coupon .right .rightOne {
    margin-top: 10%;
    font-weight: bolder;
    font-size: 100%;
    width: 100%;
    height: 20%;
  }

  #userCoupon .coupon .right .rightTwo {
    padding-top: 1.5%;
    font-size: 70%;
    width: 100%;
    height: 20%;
  }

  #userCoupon .coupon .right .rightThree {
    font-size: 40%;
    width: 100%;
    height: 20%;
  }

  #userCoupon .coupon .right div {
    text-align: left;
  }

  .userCouponOne .coupon .right .use {
    float: right;
    padding: 2% 6% 2%;
    font-size: 120%;
    font-weight: bolder;
    border-radius: 25px;
    background-color: #e6bd77;
  }

  .userCouponTwo .coupon .right .use {
    float: right;
    padding: 2% 6% 2%;
    font-size: 120%;
    font-weight: bolder;
    border-radius: 20px;
    background-color: #e0e0e0;
  }

  .isBlank {
    text-align: center;
    padding-top: 10%;
    width: 100%;
    height: 10%;
    font-size: 100%;
  }

</style>
