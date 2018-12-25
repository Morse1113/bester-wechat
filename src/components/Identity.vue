<template>
  <div class="container">
    <h1>我的信息</h1>
    <input class="file" name="file" type="file" accept="image/png,image/jpg,image/jpeg,image/bmp" @change="bind"/>
  </div>
</template>

<script>
  import {upload} from "@/js/api";

  export default {
    name: "Identity",
    data() {
      return {

      }
    },
    methods: {
      bind: function (e) {
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('image',file,file.name);//通过append向form对象添加数据
        param.append('chunk','0');//添加form表单中其他数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        upload('/user/identityCard', param, config).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>

</style>
