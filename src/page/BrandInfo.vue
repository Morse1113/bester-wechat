<template>
  <div class="body_div">
    <div><img :src="picture" style="width: 100%; height: auto; z-index: -999" onerror="this.src='../static/img/nothing.jpg'"/></div>
      <div class="logo_img">
        <img :src="logo" style="width: 100%; height: auto; border: 1px solid #9a9a9a"/>
      </div>
    <div class="img_div" style="margin-top: -25px; margin-left: 37%">
      <strong style="margin-left: -60%">{{brandName}}</strong>
      <div style="margin-top: -20px; margin-left: 30%"><img src="../assets/before.png" style="width: 20px; height: 20px;"/>&nbsp;&nbsp;{{praiseNum}}
      </div>
      <div style="margin-top: -23px; margin-left: 70%"><img src="../assets/before1.png" style="width: 20px; height: 20px;"/>&nbsp;&nbsp;{{collectNum}}
      </div>
    </div>
    <div class="name_div">
      <div style="float: left; width: 10%; height: 100%; background-color: darkgrey; margin-left: 8%">
        <img src="../assets/weizhi.png" style="width: 20px; height: auto; margin-top: 6px"/>
      </div>
      <p style="float: left; margin-left: 2%;margin-top: 8px">{{address}}</p>
      <div class="phone_div" style="float: left; width: 10%; height: 100%; background-color: darkgrey; margin-left: 20%">
        <img src="../assets/dianhua.png" style="width: 20px; height: auto; margin-top: 6px;"/>
      </div>
      <a :href="'tel:' + phone" style="text-decoration:none; float: left; margin-left: 2%; margin-top: -5px"><p>{{phone}}</p></a>
    </div>
    <div style="width: 50%; height: 20px; margin-top: 20px">
      <img src="../assets/right.png" style="float: left; width: 12px; height: auto; margin-left: 17%"/>
      <strong style="float: left; margin-left: 5%; margin-top: -3px">店铺信息</strong>
    </div>
    <hr style="margin-top: 10px"/>
    <div style="text-align:justify; width: 90%; height: 300px; overflow-y: scroll; margin-left: 5%; margin-top: 20px; font-family:'思源黑体'; font-size:15px;">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{introduce}}
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'
 export default {
   data() {
     return{
       picture: '',
       logo: '',
       address: '',
       phone: '',
       introduce: '',
       brandName: '',
       praiseNum: 0,
       collectNum: 0
     }
   },
   mounted(){
     const routerParams = this.$route.query.mallCode;
     service('get', '/brand/detail', {
       brandId: routerParams
     }).then(data => {
       if (data.code !== 200) {
         alert(data.message);
         return;
       }
       this.picture = data.data.shopPicture;
       this.logo = data.data.brandLogo;
       this.address = data.data.address;
       this.phone = data.data.phoneNum;
       this.introduce = data.data.introduce;
       this.brandName = data.data.brandName;
       this.praiseNum = data.data.praiseNum;
       this.collectNum = data.data.collectNum;
     });
   }
 }
</script>
<style scoped>
  .body_div {
    width: 100%;
    background-color: #faf7fa;
    position: fixed;
  }
  .logo_img {
    z-index: 9999;
    margin-left: 7%;
    margin-top: -11%;
    width: 25%;
    height: 80px;
  }
  .name_div {
    margin-top: 50px;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    border-bottom: 1px solid #a8a8a8;
    border-top: 1px solid #a8a8a8;
  }
</style>
