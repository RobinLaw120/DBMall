import Toast from "./Toast";

const obj = {}


//vue.use调用此函数，并传入vue对象
obj.install = function (Vue) {

  // Vue.extend(Toast)
  // document.body.appendChild(Toast.$el)

  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.new的方式,根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor();
  //3.将组件对象手动挂载到某一个element对象上
  toast.$mount(document.createElement('div'));
  //4.toast.$el对应的就是‘div'
  document.body.appendChild(toast.$el)

  // console.log('调用了obj的install方法');
  Vue.prototype.$toast = toast;
}

export default obj
