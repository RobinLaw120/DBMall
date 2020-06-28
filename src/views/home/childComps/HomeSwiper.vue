<template>
	<div>
    <swiper ref="swiperupdate">
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    components: {
      SwiperItem,
      Swiper,
    },
    props: {
      banners: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        isLoaded: false,
        counter: 0,
        bannersLength: 0
      }
    },
    methods: {
      imageLoad(){
        if(!this.isLoaded) {
          this.isLoaded = true
        }
        if(++this.counter === this.bannersLength){
          // this.$refs.swiperupdate.$forceUpdate()
          this.$emit('swiperImageLoaded')
        }

      }
    },
    watch: {
      banners(){
        this.bannersLength = this.banners.length
      }
    }
  }
</script>

<style scoped>

</style>
