<template>
 <div>
   <el-menu router :default-active="$route.meta.parentpath"  unique-opened>
     <el-menu-item index='/home'>
       <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      <template v-for="(item) in menus">
        <el-submenu :index="item.path" :key="item.id" v-if="item.children&&item.children.length>0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="item1.path"
              v-for="(item1) in item.children"
              :key="item1.id"
            >
            <i :class="item1.icon"></i>
            <span slot="title">{{item1.authName}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
 </div>
</template>

<script>
import  { createNamespacedHelpers } from 'vuex'
const userModule = createNamespacedHelpers('user')
const {mapState: uertState, mapActions:userActions} = userModule
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
     
     }
   },
   methods: {
     ...userActions(['getMenus']),
     
   },
   mounted() {
     this.getMenus()

   },
   watch: {

   },
   computed: {
     ...uertState(['menus'])
   }
 }
</script>

<style scoped lang='scss'>

</style>