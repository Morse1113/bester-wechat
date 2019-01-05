<template>
  <div class="page-infinite-wrapper">
    <ul class="mui-table-view"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="moreLoading"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false">
      <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
        <div :class="dynamicLogoBackground(item.vipLevel,item.margin)">
          <span class="led-num" v-if="item.margin==0">已抢光</span>
          <span class="led-num" v-else-if="item.limitNum!=0">可领{{item.limitNum}}张</span>
          <span class="led-num" v-else>领取上限</span>
        </div>
        <div class="div-middle">
          <div class="div-middle-top">
            <span class="coupon-name">{{item.couponName}}</span>
          </div>
          <div class="div-middle-bottom">
            <span class="coupon-info" v-if="item.couponType==1">{{item.offerCash}}元</span>
            <span class="coupon-info" v-else>{{item.offerDiscount}}折</span>
            <span :class="dynamicBackground(item.vipLevel,item.margin)" v-if="item.threshold!=null">满{{item.threshold}}元可用</span>
            <span :class="dynamicBackground(item.vipLevel,item.margin)" v-else>满零可用</span>
          </div>
        </div>
        <div :class="dynamicButtonBackground(item.vipLevel,item.margin)" @click="getCoupon(index)">
          <span class="led-button">立即领取</span>
        </div>
      </li>
      <li class="more_loading">
        <mt-spinner class="class-spinner" type="triple-bounce" color="#00ccff" :size="10"
                    v-show="!moreLoading&&!allLoaded"></mt-spinner>
        <span v-show="allLoaded">已全部加载</span>
        <span v-show="noData">暂无优惠卷信息</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {service} from "../js/api";
  import {Toast} from 'mint-ui';

  export default {
    name: 'CouponList',
    data() {
      return {
        list: [],
        moreLoading: false,
        allLoaded: false,
        pageSize: 10,
        pageNum: 1,
        couponId: null,
        message: null,
        noData: false
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        service('get', '/coupon/list', {pageNum: this.pageNum, pageSize: this.pageSize}).then(response => {
          if (response.code === 200) {
            this.list = response.data.list;
          }
          if (response.code === 404) {
            this.noData = true;
            Toast(response.message);
          }
        })
      },
      getCoupon(index) {
        service('post', '/user/receive/coupon', {couponId: this.list[index].id}).then(response => {
          Toast(response.message);
          if (response.code == 200) {
            this.list[index].limitNum = this.list[index].limitNum - 1;
            this.list[index].margin = this.list[index].margin - 1;
          }
        })
      },
      dynamicLogoBackground(vipLevel,margin) {
        if (vipLevel == 1) {
          if(margin==0){
            return "div-left-1-disable";
          }
          return "div-left-1";
        }
        if (vipLevel == 2) {
          if(margin==0){
            return "div-left-2-disable";
          }
          return "div-left-2";
        }
        if (vipLevel == 3) {
          if(margin==0){
            return "div-left-3-disable";
          }
          return "div-left-3";
        }
        if (vipLevel == 4) {
          if(margin==0){
            return "div-left-4-disable";
          }
          return "div-left-4";
        }
      },
      dynamicBackground(vipLevel,margin) {
        if(margin==0){
          return "div-limit-money-disable";
        }
        if (vipLevel == 1) {
          return "div-limit-money-1";
        }
        if (vipLevel == 2) {
          return "div-limit-money-2";
        }
        if (vipLevel == 3) {
          return "div-limit-money-3";
        }
        if (vipLevel == 4) {
          return "div-limit-money-4";
        }
      },
      dynamicButtonBackground(vipLevel,margin) {
        if(margin==0){
          return "div-right-disable";
        }
        if (vipLevel == 1) {
          return "div-right-1";
        }
        if (vipLevel == 2) {
          return "div-right-2";
        }
        if (vipLevel == 3) {
          return "div-right-3";
        }
        if (vipLevel == 4) {
          return "div-right-4";
        }
      },
      loadMore() {
        if (this.allLoaded) {
          this.moreLoading = true;
          return;
        }
        this.pageNum++;
        service('get', '/coupon/list', {pageNum: this.pageNum, pageSize: this.pageSize}).then(response => {
          if (response.code === 200) {
            this.list = this.list.concat(response.data.list);
            this.allLoaded = response.data.list.length != this.pageSize;
          }
          if (response.code === 404) {
            this.allLoaded = true;
          }
        })
      }
    }
  }
</script>
<style scoped>
  .page-infinite-wrapper {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  ul {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding-left: 0px;
  }

  li {
    height: 144px;
    border-bottom: 10px solid #faf7fa;
    background-color: #f2f2f2;
  }

  li:last-child {
    border: none;
  }

  .div-middle {
    overflow:hidden;
    /*zoom:1;*/
    height: 100%;
    width: 45%;
    float: left;
  }

  .div-middle-top{
    height: 50%;
    width: 100%;
  }

  .div-middle-bottom{
    height: 50%;
    width: 100%;

  }

  .coupon-name{
    word-wrap: break-word;
    font-size: 16px;
    font-weight: bolder;
    font-family: STHeiti,serif;
    position: relative;
    top: 30%;
  }

  .coupon-info {
    display: inline-block;
    width: 100%;
    font-size: 17px;
    font-weight: bolder;
    font-family: STHeiti;
  }
  .led-num {
    font-size: 15px;
    font-weight: bolder;
    font-family: STHeiti;
    position: relative;
    top: 10%;
    left: 12%;
  }
  .led-button{
    display: inline-block;
    height: 60%;
    width: 20%;
    font-size: 16px;
    font-weight: bolder;
    font-family: STHeiti;
    position: relative;
    top:20%;
  }

  .div-left-1 {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/blackGoldMemberShipLogo.png");
    background-size: 100% 100%;
  }

  .div-left-1-disable {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/disBlackGoldMemberShipLogo.png");
    background-size: 100% 100%;
  }

  .div-left-2 {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/platinumMemberShiplogo.png");
    background-size: 100% 100%;
  }

  .div-left-2-disable {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/disPlatinumMemberShiplogo.png");
    background-size: 100% 100%;
  }

  .div-left-3 {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/goldMemberShiplogo.png");
    background-size: 100% 100%;
  }

  .div-left-3-disable {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/disGoldMemberShiplogo.png");
    background-size: 100% 100%;
  }

  .div-left-4 {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/silverMemberShiplogo.png");
    background-size: 100% 100%;
  }

  .div-left-4-disable {
    height: 100%;
    width: 30%;
    float: left;
    background-image: url("../assets/disSilverMemberShiplogo.png");
    background-size: 100% 100%;
  }

  .div-limit-money-disable {
    color: white;
    display: inline-block;
    width: 100%;
    font-size: 15px;
    font-family: STHeiti;
    position: relative;
    top: 25%;
    background-image: url("../assets/disMoneyBackground.png");
    background-size: 100% 100%;
  }

  .div-limit-money-1 {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    font-family: STHeiti;
    position: relative;
    top: 25%;
    background-image: url("../assets/blackGoldMoneyBackground.png");
    background-size: 100% 100%;
  }

  .div-limit-money-2 {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    font-family: STHeiti;
    position: relative;
    top: 25%;
    background-image: url("../assets/platinumMoneyBackground.png");
    background-size: 100% 100%;
  }

  .div-limit-money-3 {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    font-family: STHeiti;
    position: relative;
    top: 25%;
    background-image: url("../assets/goldMoneyBackground.png");
    background-size: 100% 100%;
  }

  .div-limit-money-4 {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    font-family: STHeiti;
    position: relative;
    top: 25%;
    background-image: url("../assets/silverMoneyBackground.png");
    background-size: 100% 100%;
  }

  .div-right-disable {
    width: 25%;
    height: 100%;
    float: left;
    background-image: url("../assets/disButtonBackground.png");
    background-size: 100% 100%;
    color: white;
  }

  .div-right-1 {
    width: 25%;
    height: 100%;
    float: left;
    background-image: url("../assets/blackGoldButtonBackground.png");
    background-size: 100% 100%;
  }

  .div-right-2 {
    width: 25%;
    height: 100%;
    float: left;
    background-image: url("../assets/platinumButtonBackground.png");
    background-size: 100% 100%;
  }

  .div-right-3 {
    width: 25%;
    height: 100%;
    float: left;
    background-image: url("../assets/goldButtonBackground.png");
    background-size: 100% 100%;
  }

  .div-right-4 {
    width: 25%;
    height: 100%;
    float: left;
    background-image: url("../assets/silverButtonBackground.png");
    background-size: 100% 100%;
  }
</style>
