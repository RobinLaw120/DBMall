import {
  ADD_OLD_COUNTER,
  ADD_NEW_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload){

    //监听添加购物车的操作
    return new Promise(((resolve, reject) => {
      //查找是否有此商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid;
      })
      if(oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_OLD_COUNTER, oldProduct);
        resolve('当前商品数量+1')
      }else {
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit(ADD_NEW_TO_CART, payload);
        resolve('添加新的商品')
      }
    }))
  }
}
