<template>
  <div class="brand_div">
    <div class="search_div">
      <input placeholder="输入店铺或品牌名称搜索" @keyup.enter="searchs()" v-model="brandName"/>
      <i class="i_div"></i>
      <div class="screen_div" @click="dialogShow = true">
        <img id="screen_div_img" src="../assets/shaixuan.png"/>
      </div>
    </div>
    <div class="recommend_slogan"><h5 class="h5_slogan">推荐品牌</h5></div>
    <div class="fill_div"></div>
    <div class="recommend_div">
      <div class="recommend_div_three" v-for="brand in headerBrands">
        <img class="recommend_img_three" :src="brand.logo" @click="brandInfo(brand.brandId)"/><br/>
        <p class="p_size">{{brand.brandName}}</p>
      </div>
    </div>
    <div class="all_slogan"><h5 class="h5_slogan">所有品牌</h5></div>
    <div v-if="searchBack" class="one_div">
      <div v-for="(result, index) in searchBack" class="box">
        <div class="content">
          <div class="img_div">
            <img v-bind:src="result.brandLogo" class="image_style" @click="brandInfo(result.brandId)">
          </div>
          <div class="info_div">
            <h5 class="h5_brand_name">{{result.brandName}}</h5>
            <h5 class="h5_floor"><img src="../assets/address1.png" id="floor_image"/>{{result.floor}}号馆
            </h5>
          </div>
          <div class="before_div">
            <template>
              <div v-if="result.collect">
                <h5><img src="../assets/after1.png"
                         class="like_collect_img" @click="likeAndCollect(index,type=2)"/>&nbsp;&nbsp;已收藏&nbsp;&nbsp;&nbsp;&nbsp;{{result.collectNum}}
                </h5>
              </div>
              <div v-else>
                <h5><img src="../assets/before1.png"
                         class="like_collect_img" @click="likeAndCollect(index,type=2)"/>&nbsp;&nbsp;收藏&nbsp;&nbsp;&nbsp;&nbsp;{{result.collectNum}}
                </h5>
              </div>
              <div v-if="result.like">
                <h5><img src="../assets/after.png"
                         class="like_collect_img" @click="likeAndCollect(index,type=1)"/>&nbsp;&nbsp;已点赞&nbsp;&nbsp;&nbsp;&nbsp;{{result.praiseNum}}
                </h5>
              </div>
              <div v-else>
                <h5><img src="../assets/before.png"
                         class="like_collect_img" @click="likeAndCollect(index,type=1)"/>&nbsp;&nbsp;点赞&nbsp;&nbsp;&nbsp;&nbsp;{{result.praiseNum}}
                </h5>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_div"><span class="bottom_span">没有更多了~~~~~</span></div>
    <div class="dialog" v-show="dialogShow">
      <div class="mask"></div>
      <div class="float_frame">
        <div class="choice_div">
          <div class="choice_left" @click="states=1">楼号<img :src="this.states===1 ? selectedTypes[0] : '../assets/down.png'" class="down_up_img"/></div>
          <div class="choice_center" @click="states=2">业态<img :src="this.states===2 ? selectedTypes[0] : '../assets/down.png'" class="down_up_img"/></div>
          <div class="choice_right" @click="states=3">排序<img :src="this.states===3 ? selectedTypes[0] : '../assets/down.png'" class="down_up_img"/></div>
        </div>
        <div class="center_content" v-show="this.states===1" id="state1">
          <div class="center_left">亚欧国际小镇</div>
          <div class="right_div">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          </div>
        </div>
        <div class="center_content" v-show="this.states===2" id="state2">
          <div v-for="(t, index) in types">
            <img :src="typeSelected === index ? selectedTypes[index] : t" @click="typeSelected=index" class="center_img"/>
          </div>
        </div>
        <div class="center_content" v-show="this.states===3" id="state3">
          <div class="center_left">亚欧国际小镇</div>
          <div class="right_div">
            <mt-picker :slots="sort" @change="onSortChange"></mt-picker>
          </div>
        </div>
        <div class="click_div">
          <div class="click_left" @click="dialogShow=false"><p class="p_style">取消</p></div>
          <div class="click_right" @click="clickRight()"><p class="p_style">确定</p></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'
  import aolai from '../assets/type/aolai.png'
  import canyin from '../assets/type/canyin.png'
  import ertongguan from '../assets/type/ertongguan.png'
  import liren from '../assets/type/liren.png'
  import maoyi from '../assets/type/maoyi.png'
  import qinzijiudian from '../assets/type/qinzijiudian.png'
  import xinlingshou from '../assets/type/xinlingshou.png'
  import xiuxian from '../assets/type/xiuxian.png'
  import yingyuan from '../assets/type/yingyuan.png'
  import yule from '../assets/type/yule.png'

  export default {
    data() {
      return {
        brandName: '',
        brandType: 0,
        floor: 0,
        searchBack: null,
        type: 0,
        slots:[{values: ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#']}],
        sort:[{values: ['默认排序','点赞排序','收藏排序']}],
        val: '',
        states: 1,
        typeSelected: -1,
        types: [yule, canyin, aolai, xiuxian, xinlingshou, yingyuan, liren, maoyi, ertongguan, qinzijiudian],
        selectedTypes: ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535765175&di=0199743b7f771770da0d2a7369dab307&src=http://www.epbiao.com/Public/upload/remote/2017/08/75571501738934.png'],
        headerBrandIds: [32, 16, 27],
        headerBrands: [],
        dialogShow: false,
        choiceFloor: 0,
        choiceTypes: 0,
        choiceSort: 0
      }
    },
    mounted(){
      this.recommend();
      this.query();
    },
    methods: {
      recommend: function() {
        for (let index = 0; index < this.headerBrandIds.length; index++) {
          service('get', '/brand/detail', {
            brandId: this.headerBrandIds[index]
          }).then(data => {
            if (data.code !== 200) {
              alert(data.message);
              return;
            }
            let brandInfo = {
              brandId: this.headerBrandIds[index],
              logo: data.data.brandLogo,
              brandName: data.data.brandName
            };
            this.headerBrands.push(brandInfo);
          });
        }
      },
      query(){
        service('get', '/brand/list', {
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.searchBack = data.data;
        });
      },
      searchs() {
        service('get', '/brand/list', {
          brandName: this.brandName
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.searchBack = data.data;
        });
      },
      brandInfo(brandId){
        this.$router.push({
          path: '/brand/info',
          query: {
            mallCode: brandId
          }
        })
      },
      likeAndCollect(index, type){
        let brandInfo = this.searchBack[index];
        service('get','/brand/addNum',{
          brandId: brandInfo.brandId,
          type: type
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          if (type === 1) {
            brandInfo.like ? brandInfo.praiseNum-- : brandInfo.praiseNum++;
            brandInfo.like = !brandInfo.like;
          }
          if (type === 2) {
            brandInfo.collect ? brandInfo.collectNum-- : brandInfo.collectNum++;
            brandInfo.collect = !brandInfo.collect;
          }
        })
      },
      clickRight(){
        this.dialogShow = false;
        service('get', '/brand/list', {
          brandType: this.choiceTypes,
          orderType: this.choiceSort,
          floor: this.choiceFloor
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.searchBack = data.data;
          this.choiceSort = 0;
          this.choiceFloor = 0;
          this.choiceTypes = 0;
        });
      },
      onValuesChange(picker, values){
        this.choiceFloor = values[0].replace(/[^0-9]/ig,"");
        this.choiceTypes = 0;
        this.choiceSort = 0;
      },
      onSortChange(picker,values){
        this.val = values[0];
        if (this.val === '点赞排序'){
          this.choiceSort = 1;
          this.choiceTypes = 0;
          this.choiceFloor = 0;
        } else if (this.val === '收藏排序'){
          this.choiceSort = 2;
          this.choiceTypes = 0;
          this.choiceFloor = 0;
        }
      }
    }
  }
</script>
<style scoped>
  .brand_div {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #faf7fa;
  }

  .search_div {
    position: fixed;
    width: 100%;
    height: 80px;
    background-color: #faf7fa;
  }

  input {
    margin-top: 20px;
    margin-left: -14%;
    width: 75%;
    height: 30px;
    border: 1px solid #a9a9a9;
    border-radius: 20px;
    padding-left:20px;
    outline:none;
  }

  .i_div {
    position: absolute;
    left: 0;
    background: url("../assets/search.png") no-repeat;
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-left: 75%;
    margin-top: 29px;
  }

  .recommend_slogan {
    border-left: 5px solid black;
    height:18px;
    position: fixed;
    top: 80px;
    background-color: #faf7fa;
    width: 100%;
  }

  .h5_slogan {
    font-size: 13px;
    margin-top: 0;
    margin-left: -80%;
  }

  .fill_div {
    position: fixed;
    height: 20px;
    width: 100%;
    background-color: #faf7fa;
    top: 95px;
  }

  .recommend_div {
    position: fixed;
    width: 100%;
    height: 130px;
    top: 110px;
    background-color: #faf7fa;
  }

  .recommend_img_three {
    width: 90px;
    height: auto;
    border: 1px solid #9a9a9a;
    border-radius: 10%;
  }

  .p_size {
    font-size: 10px;
  }

  .all_slogan {
    border-left: 5px solid black;
    height: 16px;
    position: fixed;
    top: 230px;
    background-color: #faf7fa;
    width: 100%;
  }

  .screen_div{
    margin-top: -30px;
    margin-left: 72%;
  }

  #screen_div_img {
    width: 50%;
    margin-left: 30%;
  }

  .image_style {
    width: 100%;
    height: 70px;
    border: 1px solid #9a9a9a;
    border-radius: 10%;
  }

  .one_div {
    margin-top: 260px;
    width: 100%;
  }

  .content {
    border-bottom: 1px solid #a9a9a9;
    width: 100%;
    height:80px;
    margin-top: 10px;
  }
  .img_div {
    border-radius: 8%;
    width: 20%;
    height:auto;
    margin-left: 20px;
  }
  .box {
    margin-top: 17px;
  }

  .info_div {
    width: 80px;
    margin-top: -95px;
    margin-left: 30%;
  }

  .h5_brand_name {
    height: 20px
  }

  .h5_floor {
    padding-top: -20px;
  }

  #floor_image {
    width: 20px;
    height: auto;
  }
  .before_div {
    margin-right: -50%;
    margin-top: -91px;
  }
  .recommend_div_three {
    float: left;
    width: 30%;
    height: 120px;
    border-radius: 10%;
    margin-left: 2.5%;
  }

  .like_collect_img {
    width: 20px;
    height: 20px;
  }

  .bottom_div {
    height: 20px;
    width: 100%;
    margin-top: 20px;
  }

  .bottom_span {
    font-family: '黑体';
  }

  .dialog {
    width: 100%;
    height: 100%;
  }
  .float_frame {
    width: 100%;
    height: 300px;
    background-color: white;
    top: 80px;
    position: fixed;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .click_div {
    width: 100%;
    height: 40px;
  }
  .click_left {
    float: left;
    width: 49%;
    height: 40px;
    text-align: center;
    background-color: #e0e0e0;
  }
  .click_right {
    float: left;
    width: 50.9%;
    height: 40px;
    background-color: #e6bd77;
  }
  .choice_div {
    margin-top: 8px;
    width: 100%;
    height: 30px;
    border-bottom: 15px solid #faf7fa;
  }
  .choice_left {
    float: left;
    width: 32%;
    border-right: 1px solid #9a9a9a;
  }
  .choice_center {
    float: left;
    width: 33%;
  }
  .choice_right {
    float: left;
    width: 32%;
    border-left: 1px solid #9a9a9a;
  }
  .p_style {
    margin-top: 8px;
  }
  .center_content {
    width: 100%;
    height: 210px;
  }
  .center_img {
    float: left;
    width: 14%;
    height: auto;
    margin-left: 5%;
    margin-top: 20px;
  }
  .down_up_img {
    width: 8px;
    height: 8px;
    margin-left: 8px;
  }
  .center_left {
    float:left;
    width: 49%;
    padding-top: 77px;
  }

  .right_div {
    float: left;
    width: 49%;
  }
</style>
