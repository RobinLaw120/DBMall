<template>
    <swiper class="detail-swiper" ref="swiperd">
      <swiper-item v-for="item in topImages" >
        <img :src="item" alt="" @load="swiperLoad">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    data() {
      return {
        counter: 0,
        swiperItemLength: 0,
      }
    },
    components: {
      SwiperItem,
      Swiper
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      swiperLoad(){
        //控制只发射函数一次
        if(++this.counter === this.swiperItemLength){
          this.$emit('swiperImageLoaded');
          // this.$refs.swiperd.$forceUpdate()
        }
      }
    },
    //监控对象
    watch: {
      topImages() {
        this.swiperItemLength = this.topImages.length
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
  }
</style>
