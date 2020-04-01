import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {Notify,Col, Row,Image,Field,Button  } from 'vant';
import 'vant/lib/index.css';

Vue.use(Notify);
Vue.use(Col);
Vue.use(Row);
Vue.use(Image);
Vue.use(Field);
Vue.use(Button);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
