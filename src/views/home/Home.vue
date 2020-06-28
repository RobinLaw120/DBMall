<template>
	<div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoaded="swiperImageLoaded" ref="homeswiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
<!--    组件监听原生事件-->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  // import BackTop from "../../components/content/backtop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";
  import {backTopMixin, itemListenerMixin} from "../../common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
      // Swiper,
      // SwiperItem
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // itemImageListen: null//混入了
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //注意防抖。调用频繁问题
    mounted() {
      //  const refresh = debounce(this.$refs.scroll.refresh,100)
      //  this.itemImageListen = () => {
      //    // console.log('-----');
      //    //刷新可滚动组件，处理异步数据改变的样式
      //    //this.$refs.scroll.refresh();
      //    refresh()
      //  }
      // //监听总线方法(图片加载完成)
      // this.$bus.$on('itemImageLoaded', this.itemImageListen)
    },
    // mounted() {
    //   //所有的组件都有$el属性，用于获取组件内的元素
    //   // console.log(this.$refs.tabControl.$el.offsetTop);
    // },

    //状态保留方法
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      // this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log('deactivated');
      this.saveY = this.$refs.scroll.getScrollY();
      //取消全局事件的监听,保证回到从详情页面回来保持状态，防止又刷新
      this.$bus.$off('itemImageLoaded', this.itemImageListen)
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
      事件监听的方法
      */
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // backTopClick() {
      //   // console.log('回到顶部');
      //   //拿到scroll组件中的scroll对象调用scrollTo方法
      //   // this.$refs.scroll.scroll.scrollTo(0,0,500)
      //   this.$refs.scroll.scrollTo(0,0,500)
      // },
      contentScroll(position){
        // console.log(position.y);
        // this.isShowBackTop = (-position.y) > 1000;
        this.listenShowBackTop(position);
        //tab-control的吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore(){
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoaded(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // this.$refs.homeswiper.$forceUpdate()
      },
      /*
      网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;

        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //刷新可滚动组件，处理异步数据改变的样式
          this.$refs.scroll.refresh();
          //必须调用上拉加载完成函数
          this.$refs.scroll.finishPullUp()

        })
      }

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

 .home-nav {
  background-color: var(--color-tint);
  color: white;


  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

  .tab-control {
    position: relative;
    z-index: 9;
  }


  .content{
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
