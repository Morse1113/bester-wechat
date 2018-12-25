<template>
  <div class="body_div">
    <div><img :src="picture" style="width: 100%; height: auto"/></div>
    <div class="logo_div"><img :src="logo" style="width: 100px; height: 80px"/></div>
    <div class="name_div"><p style="color: aliceblue">{{brandName}}</p><p style="color: aliceblue"><img src="../assets/address.png" style="width: 20px; height: auto"/>{{address}}</p></div>
    <div style="color: aliceblue" class="phone_div">
      <img src="../assets/phone.png" style="width: 20px; height: auto"/>
      <a :href="'tel:' + phone" style="text-decoration:none;color: aliceblue;">{{phone}}</a>
    </div>
    <hr/>
    <div style="color: aliceblue">{{introduce}}</div>
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
       brandName: ''
     }
   },
   mounted(){
     const routerParams = this.$route.query.mallCode;
     service('get', '/brand/info', {
       BrandId: routerParams
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
       console.log(this.picture)
     });
   }
 }
</script>
<style scoped>
  .body_div {
    width: 100%;
    height: 736px;
    background: url("../assets/brand-BackGround.jpg") 100% 100%;
    background-size: cover;
  }
  .logo_div {
    margin-left: -50%;
    margin-top: -10%;
  }
  .name_div {
    margin-left: -50%;
  }
  .phone_div {
    margin-top: -10%;
    margin-right: -50%;
  }
</style>
