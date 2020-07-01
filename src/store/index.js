import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//1.安装插件
Vue.use(Vuex)


const state = {
  cartList: []
}

//2.创建对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})


//挂载
export default store
