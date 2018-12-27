<template>
  <div class="container">
    <!--已认证信息-->
    <div class="user-identity" v-show="verified">
      <div class="identity-info">
        <p>证件类型：<span>身份证</span></p>
        <p>证件号码：<span>{{ identityId }}</span></p>
      </div>
      <div class="user-info">
        <p>姓名：<span>{{ userName }}</span></p>
        <p>性别：<span>{{ sex }}</span></p>
        <p>民族：<span>{{ nationality }}</span></p>
        <p>生日：<span>{{ birth }}</span></p>
        <p>住址：<span>{{ address }}</span></p>
      </div>
    </div>
    <!--上传照片认证-->
    <div class="upload-card" v-show="!verified">
      <p>请拍摄身份证正面</p>
      <div class="image-pic">
        <label class="upload">
          <img class="identity-pic" id="identity-pic" src="../assets/identity.png"/>
          <input class="file" name="file" type="file" accept="image/png,image/jpg,image/jpeg,image/bmp" hidden
                 @change="preview"/>
        </label>
      </div>
      <span class="alert">支持png、jpg、jpeg、bmp格式，大小2M以内</span>
      <button class="submit" @click="upload">提交</button>
      <mt-spinner class="spinner" id="spinner" type="snake"></mt-spinner>
    </div>
  </div>
</template>

<script>
  import {upload} from "@/js/api";
  import {service} from "../js/api";
  import {Toast} from 'mint-ui';

  export default {
    name: "Identity",
    data() {
      return {
        verified: false,
        identityId: '',
        userName: '',
        sex: '',
        nationality: '',
        birth: '',
        address: '',
        param: ''
      }
    },
    mounted() {
      service('get', '/user/identity', {}).then(response => {
        if (response.code !== 200) {
          Toast(response.message)
        }
        this.verified = response.data.verified;
        if (this.verified) {
          let identityInfo = response.data.identityInfo;
          this.identityId = identityInfo.identityId;
          this.userName = identityInfo.name;
          this.sex = identityInfo.sex;
          this.nationality = identityInfo.nationality;
          this.birth = identityInfo.birthday;
          this.address = identityInfo.address;
        }
      })
    },
    methods: {
      upload: function () {
        if (this.param === '') {
          Toast('请选择图片');
          return;
        }
        let elementById = document.getElementById('spinner');
        elementById.style.display = "block";
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        upload('/user/identityCard', this.param, config).then(response => {
          elementById.style.display = "none";
          if (response.code !== 200) {
            Toast(response.message);
            return;
          }
          Toast("实名认证成功！");
          setTimeout(function () {
            location.reload();
          }, 1000);
        });
      },
      preview: function (e) {
        let file = e.target.files[0];
        let size = (file.size / 1024 / 1024).toFixed(2);
        if (size > 2) {
          Toast('图片过大：' + size + 'M');
          file = null;
          return;
        }
        let imageUrl = this.getObjectURL(file);
        let image = document.getElementById('identity-pic');
        image.src = imageUrl;
        this.param = new FormData(); //创建form对象
        this.param.append('image', file, file.name);//通过append向form对象添加数据
        this.param.append('chunk', '0');//添加form表单中其他数据
      },
      getObjectURL: function (file) {
        let url = null;
        if (window.createObjectURL !== undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL !== undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      }
    }
  }
</script>

<style scoped>

  .user-identity {
    background-color: #faf7fa;
    background-size: cover;
    height: 100%;
  }

  .identity-info {
    position: relative;
    top: 16px;
    margin: 0 auto;
    width: 100%;
    background-color: white;
  }

  .user-info {
    position: relative;
    top: 32px;
    margin: 0 auto;
    width: 100%;
    background-color: white;
  }

  .user-identity p {
    margin: 0 auto;
    text-align: left;
    padding: 16px;
    border-bottom: 1px solid;
    border-color: #ececec;
    font-size: 16px;
    font-family: 思源黑体, sans-serif;
    color: #333333;
    width: 80%;
  }

  .user-identity p:last-child {
    border-bottom: none;
  }

  .upload-card p {
    margin: 0 auto;
    text-align: left;
    padding: 30px 0 12px 20px;
    font-size: 14px;
    font-family: 思源黑体, sans-serif;
    color: darkgray;
    background-color: #faf7fa;
  }

  .alert {
    position: relative;
    font-size: 12px;
    padding: 20px 15% 20px 0;
    float: right;
    top: 30px;
    color: darkgray;
    display: block;
  }

  .upload {
    display: block;
    position: relative;
    top: 40px;
  }

  .image-pic {
    height: 200px;
  }

  .identity-pic {
    margin: 0 auto;
    max-width: 80%;
    max-height: 200px;
  }

  .submit {
    position: relative;
    top: 60px;
    height: 46px;
    width: 60%;
    background-color: #DAA24B;
    border-radius: 18px;
    outline: none;
    border: none;
    font-size: 16px;
  }

  .spinner {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .user-identity span {
    float: right;
    color: darkgray;
  }
</style>
