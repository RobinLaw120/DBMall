import {debounce} from "./utils";
import BackTop from "../components/content/backtop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListen: null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImageListen = () => {
      refresh();
    }
    this.$bus.$on('itemImageLoaded',this.itemImageListen)
    // console.log('我是混入内容');
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000;
    }
  }
}
