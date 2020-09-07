<template>
 <div>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const goodsModule = createNamespacedHelpers("goods");
const { mapState: goodstState, mapActions: goodsActions } = goodsModule;
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
...goodsActions(["getgoodscategories"]),
   },
   mounted() {

   },
   watch: {

   },
   computed: {
 ...goodstState(["goodscategories"])
   }
 }
</script>

<style scoped lang='scss'>

</style>