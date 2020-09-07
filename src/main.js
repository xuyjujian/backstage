import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import VCharts from 'v-charts'
import echarts from 'echarts'
import Mytable from '../src/components/assembly/Mytable.vue'
import Myform from '../src/components/assembly/Myform.vue'
import Myforms from '../src/components/assembly/Myforms.vue'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts
Vue.component("Mytable",Mytable)
Vue.component("Myform",Myform)
Vue.component("Myforms",Myforms)
Vue.use(VCharts)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
  
}).$mount("#app");
