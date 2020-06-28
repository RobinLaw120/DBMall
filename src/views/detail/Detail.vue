<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" @swiperImageLoaded="swiperLoad" ref="swiperDetail"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoaded="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import GoodsList from "../../components/content/goods/GoodsList";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {backTopMixin, itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        currentIndex: 0
        // itemImageListen: null//混入了
      }
    },
    mixins:[itemListenerMixin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    created() {
      //保存iid
      this.iid = this.$route.params.iid
      //根据iid请求数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.轮播图片
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        this.shop = new Shop(data.shopInfo);
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
        // this.$nextTick(() => {
        //   this.themeTopYs = [];
        //
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //
        //   console.log(this.themeTopYs);
        // })
      })


      getRecommend().then((res) => {
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad(){
        //图片加载完
        this.$refs.scroll.refresh();

        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);

      },
      swiperLoad(){
        // this.$refs.scroll.refresh();
        // this.$refs.swiperDetail.$forceUpdate();
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,100);
      },
      contentScroll(position){
        // console.log(position.y);
        //获取y值
        const positionY = -position.y;
        let leng = this.themeTopYs.length
        for(let i = 0; i < leng-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
        this.listenShowBackTop(position);

        // for(let i = 0; i < this.themeTopYs.length; i++) {
        //   // console.log(i);
        //   // parseInt(i)
        //   if(this.currentIndex !== i &&((i<this.themeTopYs.length -1 && positionY >= this.themeTopYs[i] &&
        //   positionY < this.themeTopYs[i+1]) || (i === this.themeTopYs.length -1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     // console.log(this.currentIndex);
        //     this.$refs.detailNav.currentIndex = this.currentIndex
        //   }
        // }
      },
      addToCart() {
        console.log('---');
      }
    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh,100)
      // this.itemImageListen = () => {
      //   refresh();
      // }
      // this.$bus.$on('itemImageLoaded',this.itemImageListen)
    },
    updated() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoaded',this.itemImageListen)
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

  .content{
    height: calc(100% - 93px);
  }
</style>
