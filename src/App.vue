<template>
  <div id="app">
    <router-view class="Router"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
      }
    }
  }
</script>

<style>

  html, body, #app {
    height: 100%;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    width: 100%;
    height: 100%;
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
