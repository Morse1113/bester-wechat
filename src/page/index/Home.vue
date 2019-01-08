<template>
  <div class="all">
    <div class="home-banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banners">
            <img class="banner-img" :src=item.img @click="jump(item.link)">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="row">
      <img v-for="item in firstRow" class="recommend-img" :src=item.img @click="jump(item)">
    </div>
    <div class="row">
      <img v-for="item in secondRow" class="recommend-img" :src=item.img @click="jump(item)">
    </div>
    <div class="ad">
      <img class="featured" src="../../assets/banner4.png" @click="jump()">
    </div>
  </div>
</template>

<style scoped>

  .all {
    width: 100%;
    height: 100%;
  }

  .banner-img {
    width: 100%;
    position: relative;
  }

  .recommend-img {
    width: 15%;
    float: left;
    margin-left: 7.8%;
  }

  .featured {
    width: 100%;
  }

</style>

<script>

  import banner1 from '../../assets/banner1.png'
  import banner2 from '../../assets/banner2.png'
  import banner3 from '../../assets/banner3.png'
  import cardPackage from '../../assets/cardPackage.png'
  import guide from '../../assets/guide.png'
  import mall from '../../assets/mall.png'
  import map from '../../assets/map.png'
  import movie from '../../assets/movie.png'
  import order from '../../assets/order.png'
  import parking from '../../assets/parking.png'
  import vip from '../../assets/vip.png'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {service} from "../../js/api";

  export default {
    name: "Home",

    data() {
      return {
        code: this.$route.query.code,
        openId: '',
        banners: [
          {
            img: banner1,
            link: ''
          },
          {
            img: banner2,
            link: ''
          },
          {
            img: banner3,
            link: ''
          }
        ],
        firstRow: [
          {
            img: vip,
            link: '/VIP'
          },
          {
            img: cardPackage,
            link: ''
          },
          {
            img: guide,
            link: ''
          },
          {
            img: parking,
            link: ''
          }
        ],
        secondRow: [
          {
            img: mall,
            link: ''
          },
          {
            img: map,
            link: ''
          },
          {
            img: order,
            link: ''
          },
          {
            img: movie,
            link: ''
          }
        ]
      }
    },
    mounted() {
      new Swiper('.swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet'
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        effect: 'slide',
        direction: 'horizontal',
      });
      this.addUserInfo();
    },
    methods: {
      jump: function (item) {
        if (this.openId === null) {
          this.$router.push(item.link);
          return;
        }
        this.$router.push({
          path: item.link, query: {
            openId: this.openId
          }
        });
      },
      addUserInfo: function () {
        service('get', '/wechat/addUserInfo', {
          code: this.code,
          userOpenId: this.openId
        }).then(data => {
          this.openId = data.data.openId;
        })
      }
    }
  }
</script>


