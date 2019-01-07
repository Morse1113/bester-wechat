<template>

</template>

<script>
  import {service} from "../js/api";

  export default {
    name: "Authorization",
    mounted() {
      this.toRedirect();
    },
    methods: {
      toRedirect: function () {
        service('get', '/wechat/authorization', {}).then(data => {
          if (data.code === 200) {
            window.location.href=data.data.redirectUrl;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
