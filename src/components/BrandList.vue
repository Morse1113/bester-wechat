<template>
  <div class="brand_div">
    <div class="search_div">
      <input placeholder="搜索" @keyup.enter="searchs()" v-model="brandName" class="user"/>
      <i class="i_div"></i>
    </div>
    <div v-if="searchBack" class="one_div" id="search_div">
      <div>
        <h4 style="color: aliceblue">搜索结果</h4>
      </div>
      <div v-for="backs in searchBack">
        <div v-for="result in backs" class="box">
          <div>
            <img :src="result.brandLogo" class="image_style" @click="BrandInfo(result.brandId)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="one_div" id="first">
        <div v-for="brand in brandLists" class="box">
          <div class="content">
            <div class="img_div">
              <img v-bind:src="brand.brandLogo" class="image_style" @click="BrandInfo(brand.brandId)">
            </div>
            <div class="info_div">
              <h5>{{brand.brandName}}</h5>
              <h5 id="h5_floor"><img src="../assets/address.png" style="width: 20px; height: auto"/>{{brand.floor}}号馆
              </h5>
            </div>
            <div class="before_div">
              <img src="../assets/before.png" style="width: 20px; height: 20px"/><br/>
              <img src="../assets/before1.png" style="width: 20px; height: 20px"/>
            </div>
          </div>
          <div></div>
        </div>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'
  export default {
    data() {
      return {
        brandName: '',
        brandType: 0,
        floor: 0,
        searchBack: null,
        value: null,
        brandLists: null,
        selected: 1
      }
    },
    mounted(){
      service('get', '/brand/list', {
      }).then(data => {
        if (data.code !== 200) {
          alert(data.message);
          return;
        }
        this.brandLists = data.data;
        console.log(this.brandLists)
      });
    },
    methods: {
      searchs() {
        service('get', '/brand/list', {
          BrandName: this.brandName
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.searchBack = data.data
          alert("查询成功")
        });
      },
      BrandInfo(brandId){
        this.$router.push({
          path: '/brand/info',
          query: {
            mallCode: brandId
          }
        })
      }
    }
  }
</script>
<style scoped>
  .brand_div {
    width: 100%;
    height: 1500px;
  }

  input {
    margin: 5% auto;
    width: 80%;
    height: 34px;
    border: 1px solid rgba(199,159,103,.8);
    border-radius: 10px;
    color: #fff;
    background: rgba(199,159,103,.15);
  }

  .i_div {
    position: absolute;
    left: 0;
    background: url("../assets/search.png") no-repeat;
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-left: 80%;
    margin-top: 7%;
  }
  .image_style {
    width: 70px;
    height: 50px;
  }

  .content {
    border-bottom: 1px solid #9a9a9a;
    width: 100%;
    height:auto;
    margin-top: 10px;
  }
  .img_div {
    border: 1px solid #a9a9a9;
    border-radius: 8%;
    width: 20%;
    height:auto;
  }
  .info_div {
    margin-top: -70px;
  }
  #h5_floor {
    padding-top: -20px;
  }
  .before_div {
    margin-right: -70%;
    margin-top: -18%;
  }
</style>
