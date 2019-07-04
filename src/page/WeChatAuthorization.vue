<template>

</template>

<script>
  import {service} from "../js/api";

  export default {
    name: "Authorization",
    mounted() {
      window.location.href = '/home';
    },
    methods: {
      toRedirect: function () {
        service('get', '/wechat/authorization', {}).then(data => {
            window.location.href=data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
