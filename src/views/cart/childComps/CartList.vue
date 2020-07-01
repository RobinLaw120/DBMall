<template>
  <div class="cart-list">
    <scroll class="content" ref="cartScroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";


  export default {
    name: "CartList",
    components:{Scroll,CartListItem},
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.cartScroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }


</style>
