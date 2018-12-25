<template>
  <div class="all">
    <mt-navbar v-model="selected">
      <mt-tab-item id="unused">未使用</mt-tab-item>
      <mt-tab-item id="used">已使用</mt-tab-item>
      <mt-tab-item id="expired">已过期</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="unused">
        <mt-cell v-for="item in UnusedList" :title="item.couponName"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="used">
        <mt-cell v-for="item in UsedList" :title="item.couponName"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="expired">
        <mt-cell v-for="item in ExpiredList" :title="item.couponName"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>

<script>
  import {service} from "../js/api";

  export default {
    name: "CouponInfoList",
    data() {
      return {
        UnusedList: null,
        UsedList: null,
        ExpiredList: null,
        selected: 'unused'
      }
    },
    created () {
      this.getUnusedList();
      this.getUsedList();
      this.getExpiredList();
    },
    methods: {
      getUnusedList: function () {
        service('get', '/coupon/status', {
          status: 1
        }).then(data => {
          console.log(1)
          if (data.code !== 200) {
            console.log(2)
          } else {
            this.UnusedList = data.data.couponInfoList;
          }
        })
      },
      getUsedList: function () {
        service('get', '/coupon/status', {
          status: 2
        }).then(data => {
          if (data.code !== 200) {

          } else {
            this.UsedList = data.data.couponInfoList;
          }
        })
      },
      getExpiredList: function () {
        service('get', '/coupon/status', {
          status: 3
        }).then(data => {
          if (data.code === 200) {
            this.ExpiredList = data.data.couponInfoList;
          }
        })
      }

    }

  }
</script>

<style scoped>

</style>
