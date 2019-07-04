<template>
  <div class="all">
    <div class="userInfo">
      <img class="avatar" :src=headImgUrl><br/>
      <div class="nickname-div">
        <span class="nickname">{{nickname}}</span>
      </div>
      <div class="right-div">
        <span class="right" style="font-weight: bolder; font-size: x-small">比斯特金:<span class="" style="font-size: medium">{{besterGold}}</span></span>
      </div>
    </div>
    <div class="BG-card">
      <div class="card-div">
        <img class="card" :src=card>
      </div>
      <div class="firstHalf">
        <img v-show="firstHalf !== null" class="cardNumber" :src=img v-for="img in firstHalf">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img v-show="secondHalf !== null" class="cardNumber" :src=img v-for="img in secondHalf">
      </div>
      <div class="bindTime">
        <span class="time">{{bindTime}}</span>
      </div>
    </div>
    <img v-for="item in firstRow" class="benefits" :src=item.img @click="jump(item.link)">
    <img v-for="item in secondRow" class="benefits" :src=item.img @click="jump(item.link)">
    <div class="ad">
      <img class="featured" src="../assets/electronicMember/banner.png" @click="jump()">
    </div>
  </div>
</template>

<script>

  import background from '../assets/electronicMember/background.png'
  import banner from '../assets/electronicMember/banner.png'
  import BGcard from '../assets/electronicMember/BG-card.png'
  import SliverCard from '../assets/electronicMember/Sliver-card.png'

  import B from '../assets/electronicMember/B.png'
  import G from '../assets/electronicMember/G.png'
  import zero from '../assets/electronicMember/0.png'
  import one from '../assets/electronicMember/1.png'
  import two from '../assets/electronicMember/2.png'
  import three from '../assets/electronicMember/3.png'
  import four from '../assets/electronicMember/4.png'
  import five from '../assets/electronicMember/5.png'
  import six from '../assets/electronicMember/6.png'
  import seven from '../assets/electronicMember/7.png'
  import eight from '../assets/electronicMember/8.png'
  import nine from '../assets/electronicMember/9.png'

  import verified from '../assets/electronicMember/verified.png'
  import benefits from '../assets/electronicMember/member-benefits.png'
  import discount from '../assets/electronicMember/discount-details.png'
  import blank from '../assets/electronicMember/blank.png'
  import BGmall from '../assets/electronicMember/BG-mall.png'
  import mallFan from '../assets/electronicMember/mall-fan.png'
  import services from '../assets/electronicMember/customer-service.png'
  import {service} from "../js/api"

  export default {
    name: "ElectronicMember",
    data() {
      return {
        nickname: '',
        headImgUrl: '',
        besterGold: '',
        firstHalf: [],
        secondHalf: [],
        bindTime: '',
        background: background,
        SliverCard: SliverCard,
        card: '',
        numberMap: {},
        banner: banner,
        firstRow: [
          {
            img: verified,
            link: ''
          },
          {
            img: benefits,
            link: ''
          },
          {
            img: discount,
            link: ''
          },
          {
            img: blank,
            link: ''
          }
        ],
        secondRow: [
          {
            img: BGmall,
            link: ''
          },
          {
            img: mallFan,
            link: ''
          },
          {
            img: services,
            link: ''
          },
          {
            img: blank,
            link: ''
          }
        ]
      }
    },
    mounted() {
      this.findBesterGold();
      this.getBlackGoldId();
      // this.getUser();
      this.numberMap = new Map();
      this.numberMap.set('B', B);
      this.numberMap.set('G', G);
      this.numberMap.set('0', zero);
      this.numberMap.set('1', one);
      this.numberMap.set('2', two);
      this.numberMap.set('3', three);
      this.numberMap.set('4', four);
      this.numberMap.set('5', five);
      this.numberMap.set('6', six);
      this.numberMap.set('7', seven);
      this.numberMap.set('8', eight);
      this.numberMap.set('9', nine);
    },
    methods: {
      findBesterGold: function () {
        service('get', '/user/oreNumber', {}).then(data => {
          if (data.code === 200 && data.data !== null) {
            this.besterGold = data.data.oreNumber;
          } else {
            this.besterGold = 0;
          }
        })
      },
      getBlackGoldId: function () {
        service('get', '/blackGold/cardId', {}).then(data => {
          if (data.code === 200 && data.data !== null) {
            this.card = BGcard
            var cardId = data.data.cardId;
            var bindTime = data.data.bindTime;
            var year = bindTime.slice(2, 4);
            var month = bindTime.slice(4, 7);
            this.bindTime = month + '/' + year;
            var firstHalf = cardId.slice(0, 6);
            var secondHalf = cardId.slice(6, 12);
            this.conversionCardArray(firstHalf, 1);
            this.conversionCardArray(secondHalf, 2);
          } else {
            this.card = SliverCard
          }
        })
      },
      conversionCardArray: function (halfCard, type) {
        for (let i = 0; i < halfCard.length; i++) {
          let img = this.numberMap.get(halfCard[i]);
          if (type === 1) {
            this.firstHalf.push(img);
          } else {
            this.secondHalf.push(img);
          }
        }
      },
      jump: function (address) {
        this.$router.push(address);
      },
      getUser: function () {
        service('get', '/wechat/userInfo', {}).then(data =>{
          if (data.code === 200) {
            this.nickname = data.data.userInfo.nickname;
            this.headImgUrl = data.data.userInfo.headImgUrl;
          } else {
            // this.nickname = '亚欧小镇';
            // this.headImgUrl = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2918796768,2215175715&fm=26&gp=0.jpg';
            this.$router.push('/');
          }
        })
      }
    }
  }
</script>

<style scoped>

  .all {
    width: 100%;
    background: url("../assets/electronicMember/background.png");
    background-size: 100% 100%;
  }

  .userInfo {
    margin-top: 20px;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .right-div {
    width: 40%;
    position: absolute;
    top: 80px;
    left: 56%;
  }

  .right {
    float: right;
  }

  .BG-card {
    margin: 20px auto;
  }

  .firstHalf {
    position: relative;
    bottom: 95px;
  }

  .card {
    width: 310px;
    height: 202px;
  }

  .cardNumber {
    width: 13px;
  }

  .bindTime {
    position: relative;
    bottom: 70px;
  }

  .time {
    color: #e6bd77;
  }

  .benefits {
    width: 15%;
    float: left;
    margin-left: 7.8%;
  }

  .featured {
    width: 90%;
  }


</style>
