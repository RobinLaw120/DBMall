import {
  ADD_OLD_COUNTER,
  ADD_NEW_TO_CART
} from './mutation-types'


export default {
  [ADD_OLD_COUNTER](state, payload){
    payload.count++
  },
  [ADD_NEW_TO_CART](state, payload){
    state.cartList.push(payload)
  }
}
