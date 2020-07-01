<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default(){
      //     return ''
      //   }
      // },
      // isShow: {
      //   type: Boolean,
      //   default() {
      //     return false;
      //   }
      // }
    },

    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='添加购物车成功', duration=1500) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;

    z-index: 999;

    color: #fff;
    background-color: rgba(0,0,0,.75);
  }
</style>
