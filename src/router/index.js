import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../views/layout/Layout.vue";

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: Layout,
    children: [
      //首页
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: '首页',
          parentpath: '/home',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: '/',
        redirect: '/home'
      },
    ]
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
    meta: {
      title: '登录'
    }
  },

  //用户管理
  {
    path: "/users",
    name: "Users",
    component: Layout,
    meta: {
      icon: 'el-icon-user'
    },
    children: [
      //用户列表
      {
        path: "users",
        name: "Users",
        component: () => import('../views/userManagement/userManagement.vue'),
        meta: {
          title: '用户列表',
          parentpath: '/users/users',
          icon: 'el-icon-folder-opened'
        }
      },
    ]
  },
  //权限管理
  {
    path: "/rights",
    name: "rights",
    component: Layout,
    meta: {
      icon: 'el-icon-folder'
    },
    children: [
      //角色列表
      {
        path: "roles",
        name: "Roles",
        component: () => import('../views/Authority/rolelist.vue'),
        meta: {
          title: '角色列表',
          parentpath: '/rights/roles',
          icon: 'el-icon-setting'
        }
      },

      //权限列表
      {
        path: "rights",
        name: "Rights",
        component: () => import('../views/Authority/authority.vue'),
        meta: {
          title: '权限列表',
          parentpath: '/rights/rights',
          icon: 'el-icon-c-scale-to-original'
        }
      },
    ]
  },

  //商品管理
  {
    path: "/goods",
    name: "goods",
    component: Layout,
    meta: {
      icon: 'el-icon-shopping-bag-2'
    },
    children: [
      //商品列表
      {
        path: "goods",
        name: "Goods",
        component: () => import('../views/goods/goodslist.vue'),
        meta: {
          title: '商品列表',
          parentpath: '/goods/goods',
          icon: 'el-icon-help'
        },
      },
      
     
      //分类参数
      {
        path: "params",
        name: "Params",
        component: () => import('../views/goods/classification.vue'),
        meta: {
          title: '商品列表',
          parentpath: '/goods/params',
          icon: 'el-icon-bell'
        }
      },

      //商品分类
      {
        path: "categories",
        name: "Categories",
        component: () => import('../views/goods/goodclassificat.vue'),
        meta: {
          title: '商品列表',
          parentpath: '/goods/categories',
          icon: 'el-icon-date'
        }
      },
      //添加商品
      {
        path: "addgood",
        name: "Addgood",
        component: () => import('../views/goods/addgood.vue'),
        meta: {
          title: '添加商品',
          parentpath: '/goods/goods',
          icon: 'el-icon-help'
        }
      },
    ]
  },

  //订单管理
  {
    path: "/orders",
    name: "orders",
    component: Layout,
    meta: {
      icon: 'el-icon-s-order'
    },
    children: [
      //订单列表
      {
        path: "orders",
        name: "Orders",
        component: () => import('../views/order/orderlist.vue'),
        meta: {
          title: '订单列表',
          parentpath: '/orders/orders',
          icon: 'el-icon-folder-add',
        }
      },
    ]
  },

  //数据统计

  {
    path: "/reports",
    name: "reports",
    component: Layout,
    meta: {
      icon: 'el-icon-user'
    },
    children: [
      //数据报表
      {
        path: "reports",
        name: "Reports",
        component: () => import('../views/data/Datareport.vue'),
        meta: {
          title: '数据报表',
          parentpath: '/reports/reports',
          icon: 'el-icon-message'
        }
      },
    ]
  },

  {
    path: "/aaa",
    name: "aaa",
    component: () => import('../views/userManagement/aaaa.vue')
  }


  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  let user = localStorage.getItem('adminUser')
  if (to.path === '/login') next()
  else user ? next() : (next('/login'))
})
export default router;