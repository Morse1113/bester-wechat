<template>
  <div class="body_div">
    <div><img :src="picture" class="top_img" onerror="this.src='../static/img/nothing.png'"/></div>
    <div class="logo_img_div">
      <img :src="logo" class="logo_image"/>
    </div>
    <div class="brand_name_div">
      <strong id="brand_name">{{brandName}}</strong>
      <div id="like_div"><img src="../assets/before.png" id="like_img"/>
        &nbsp;&nbsp;{{praiseNum}}
      </div>
      <div id="collect_div"><img src="../assets/before1.png" id="collect_img"/>
        &nbsp;&nbsp;{{collectNum}}
      </div>
    </div>
    <div class="name_div">
      <div id="block_address">
        <img src="../assets/weizhi.png" class="icon"/>
      </div>
      <p id="p_address">{{address}}</p>
      <div class="block_phone">
        <img src="../assets/dianhua.png" class="icon"/>
      </div>
      <a :href="'tel:' + phone" id="tel_a"><p>{{phone}}</p></a>
    </div>
    <div class="message">
      <img src="../assets/right.png" id="message_icon"/>
      <strong id="message_strong">店铺信息</strong>
    </div>
    <hr id="hr_style"/>
    <div id="introduce_div">
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
    height: 100%;
    background-color: #faf7fa;
    overflow-y: scroll;
  }
  .top_img {
    width: 100%;
    height: auto;
  }

  .logo_image {
    width: 100%;
    height: auto;
    border: 1px solid #9a9a9a;
  }
  .logo_img_div {
    margin-left: 7%;
    margin-top: -11%;
    width: 25%;
    height: 80px;
  }

  .brand_name_div {
    margin-top: -25px;
    margin-left: 37%
  }

  #brand_name {
    margin-left: -60%;
  }

  #like_div {
    margin-top: -20px;
    margin-left: 30%;
  }

  #like_img {
    width: 20px;
    height: 20px;
  }

  #collect_div {
    margin-top: -23px;
    margin-left: 70%;
  }

  #collect_img {
    width: 20px;
    height: 20px;
  }

  #block_address {
    float: left;
    width: 10%;
    height: 100%;
    background-color: darkgrey;
    margin-left: 8%;
  }
  .name_div {
    margin-top: 50px;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    border-bottom: 1px solid #a8a8a8;
    border-top: 1px solid #a8a8a8;
  }
  .icon {
    width: 20px;
    height: auto;
    margin-top: 6px;
  }
  #p_address {
    float: left;
    margin-left: 2%;
    margin-top: 8px;
  }
  .block_phone {
    float: left;
    width: 10%;
    height: 100%;
    background-color: darkgrey;
    margin-left: 20%;
  }
  #tel_a {
    text-decoration:none;
    float: left;
    margin-left: 2%;
    margin-top: -5px;
  }
  .message {
    width: 50%;
    height: 20px;
    margin-top: 20px;
  }
  #message_icon {
    float: left;
    width: 12px;
    height: auto;
    margin-left: 17%;
  }
  #message_strong {
    float: left;
    margin-left: 5%;
    margin-top: -3px;
  }
  #hr_style {
    margin-top: 10px;
  }
  #introduce_div {
    text-align:justify;
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    font-family:'思源黑体';
    font-size:15px;
  }
</style>
