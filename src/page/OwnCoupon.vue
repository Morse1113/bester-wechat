<template>
  <div id="max">
    <div id="head">
      <div id="status1" v-on:click="getCouponList(1)">已领取</div>
      <div id="status2" v-on:click="getCouponList(2)">已使用</div>
      <div id="status3" v-on:click="getCouponList(3)">已过期</div>
    </div>
    <div id="userCoupon">
      <div class="coupon" v-for="(coupon,index) in couponList">
        <div class="left">
          <div class="leftOne" v-show="coupon.couponType==1"><span id="y">￥</span><span>{{coupon.offerCash}}</span>
          </div>
          <div class="leftOne" v-show="coupon.couponType==2"><span>{{coupon.offerDiscount}}折</span></div>
          <div class="leftTwo"><span>满{{coupon.threshold}}元可用</span></div>
        </div>
        <div class="right">
          <div class="rightOne"><span>{{coupon.couponName}}</span></div>
          <div class="rightTwo">
            <span v-show="status!=2" class="rightTwoOne">有效期至:</span>
            <span v-show="status!=2" class="rightTwoTwo">{{buildDate(coupon.failureTime)}}</span>
            <span v-show="status==2" class="rightTwoTwo">使用日期:</span>
            <span v-show="status==2" class="rightTwoTwo">{{buildDate(coupon.updateTime)}}</span>
            <span class="use" v-show="status==1">去使用</span>
            <span class="use" v-show="status==2">已使用</span>
            <span class="use" v-show="status==3">已过期</span>
          </div>
          <div class="rightThree" v-show="status==1"><span
            v-on:click="changeSizeAndValue(index)">使用规则 ></span></div>
          <div class="rightThree" v-show="status==2"><span>使用店铺:{{coupon.shopName}}</span></div>
          <div class="rightThree" v-show="status==3"><span>使用规则 ></span></div>
        </div>
        <div class="rule" v-show="rule==index && status==1" :id="'index_' + index">
          <div id="prompt">{{coupon.description}}</div>
          <div v-on:click="changeClassAndValue(index)" id="receive"><span>▲收起</span></div>
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
        rule: -1
      }
    },
    mounted() {
      this.getCouponList(1);
    },
    methods: {
      getCouponList(status) {
        switch (status) {
          case 1:
            if (this.rule != -1) {
              let id = "#index_" + this.rule
              $(id).parent().removeClass("message")
              $(id).parent().addClass("coupon")
              this.rule = -1
            }
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
            if (this.rule != -1) {
              let id = "#index_" + this.rule
              $(id).parent().removeClass("message")
              $(id).parent().addClass("coupon")
            }
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
            if (this.rule != -1) {
              let id = "#index_" + this.rule
              $(id).parent().removeClass("message")
              $(id).parent().addClass("coupon")
            }
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
        return time.substring(0, time.lastIndexOf("-") + 3).replace(/-/g, "/")
      },
      changeSizeAndValue(index) {
        if (this.rule != -1) {
          let id = "#index_" + this.rule
          $(id).parent().removeClass("message")
          $(id).parent().addClass("coupon")
        }
        this.rule = index
        let id = "#index_" + index
        $(id).parent().removeClass()
        $(id).parent().addClass("message")
      },
      changeClassAndValue(index) {
        this.rule = -1
        let id = "#index_" + index
        $(id).parent().removeClass("message")
        $(id).parent().addClass("coupon")
      }
    }
  }
</script>

<style scoped>
  #max {
    width: 100%;
    font-family: 思源黑体;
    background: #faf7fa;
    overflow-y: auto;
  }

  #head {
    position: fixed;
    font-size: 16px;
    z-index: 1000;
    height: 53px;
    width: 100%;
    background-color: #faf7fa;
  }

  #status1 {
    font-size: 100%;
    padding-top: 10px;
    height: 35px;
    width: 33.3333333%;
    float: left;
  }

  #status2 {
    font-size: 100%;
    padding-top: 10px;
    height: 35px;
    width: 33.33333333%;
    float: left;
  }

  #status3 {
    font-size: 100%;
    padding-top: 10px;
    height: 35px;
    width: 33.333333333%;
    float: right;
  }

  .statusColorOne {
    background-color: #e0e0e0;
  }

  .statusColorTwo {
    background-color: #f2f2f2;
  }

  #userCoupon {
    padding-top: 45px;
    width: 100%;
    height: 80%;
  }

  .userCouponOne .message {
    margin-top: 8px;
    width: 100%;
    height: 130px;
    background-color: white;
  }

  #userCoupon .coupon {
    margin-top: 8px;
    width: 100%;
    height: 90px;
    background-color: white;
  }

  .userCouponOne .coupon .left {
    color: #e6bd77;
  }

  .userCouponOne .message .left {
    color: #e6bd77;
  }

  .userCouponTwo .coupon {
    color: #a8a8a8;
  }

  .coupon .left {
    float: left;
    width: 35%;
    height: 90px;
  }

  .coupon .right {
    float: left;
    width: 60%;
    height: 90px;
  }

  .message .left {
    float: left;
    width: 35%;
    height: 90px;
  }

  .message .right {
    float: left;
    width: 60%;
    height: 90px;
  }

  .left .leftOne {
    font-weight: bolder;
    padding-top: 17px;
    height: 27px;
    width: 100%;
    font-size: 25px;
  }

  .left .leftTwo {
    padding-top: 15px;
    font-size: 13px;
    width: 100%;
  }

  .right .rightOne {
    margin-top: 9px;
    font-weight: bolder;
    font-size: 13px;
    width: 100%;
    height: 18px;
  }

  .right .rightTwo {
    padding-top: 14px;
    width: 100%;
    height: 18px;
  }

  .right .rightTwo .rightTwoOne {
    font-size: 11px;
  }

  .right .rightTwo .rightTwoTwo {
    font-size: 11px;
  }

  .userCouponOne .coupon .right .use {
    float: right;
    padding: 4px 11px 4px;
    font-size: 12px;
    font-weight: bolder;
    border-radius: 25px;
    background-color: #e6bd77;
  }

  .userCouponOne .message .right .use {
    float: right;
    padding: 4px 11px 4px;
    font-size: 12px;
    font-weight: bolder;
    border-radius: 25px;
    background-color: #e6bd77;
  }

  .userCouponTwo .coupon .right .use {
    float: right;
    padding: 4px 11px 4px;
    font-size: 12px;
    font-weight: bolder;
    border-radius: 25px;
    background-color: #e0e0e0;
  }

  .right .rightThree {
    padding-top: 5px;
    font-size: 10px;
    width: 100%;
    height: 20%;
  }

  .right div {
    text-align: left;
  }

  .rule {
    border-top: 4px solid #faf7fa;
    text-align: left;
    clear: both;
    width: 100%;
    height: 32px;
    font-size: 10px;
  }

  #prompt {
    color: #a8a8a8;
    height: 100%;
    width: 79%;
    padding-left: 5%;
    float: left;
  }

  #receive {
    text-align: center;
    height: 100%;
    width: 12%;
    float: right;
    padding-right: 10px;
    padding-top: 10px;
  }

  .isBlank {
    text-align: center;
    padding-top: 32px;
    width: 100%;
    height: 46px;
    font-size: 16px;
  }

</style>
