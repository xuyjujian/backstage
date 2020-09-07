import Vue from "vue";
import Vuex from "vuex";
import user from './user/uesr'
import data from './data/data'
import order from './order/order'
import roles from './roles/roles'
import goods from './goods/goods'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {

  },
  modules: {
    user,
    data,
    order,
    roles,
    goods
  }
});
