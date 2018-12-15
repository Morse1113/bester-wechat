<template>
  <div id="app">
    <router-view class="Router"/>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'App',
    data() {
      return {
        height: 0
      }
    },
    beforeCreate() {
      this.height = window.innerHeight;
    },
    mounted() {
      $(window).resize(function () {
        $('html').height(this.height);
        $('body').height(this.height);
      });
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  html, body {
    width: 100%;
  }

  .Router {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all .5s ease;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
  }
</style>
