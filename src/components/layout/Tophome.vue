<template>
 <div class="bo">
     <div class="df jc_b pad wt ">
       <div>欢迎来到小爱后台系统</div>
     <div class="df pr1">
         <div class="mr">{{nowtime}}</div>
         <div class="ml mr">天气</div>
         <div class="mr ml">亲爱的，{{name}}</div>
         <div class="goout ml" @click="goout">退出</div>
     </div>
     </div>
 </div>
</template>

<script>
import dayjs from 'dayjs'
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
       nowtime: '',
       name:''
     }
   },
   methods: {
     goout(){
       localStorage.clear()
       this.$router.push('/login')
     },
     time() {
      let day = dayjs().format("YYYY/MM/DD ");
      //   console.log(day);
      let hour = dayjs().hour();
      let minute = dayjs().minute();
      let second = dayjs().second();
      let m;
      if (hour > 12) {
        m = "下午";
        hour -= 12;
      } else {
        m = "上午";
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      let time = day + m + hour + ":" + minute + ":" + second;
      this.nowtime = time;
      //   console.log(this.nowtime);
    },

   },
   mounted() {
     this.name=JSON.parse(localStorage.getItem('adminUser')).username
    this.timer = setInterval(() => {
     this.time();
    }, 1000)
  },
   beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },

   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.goout{
  color: #409EFF;
}
.goout:hover{
  cursor: pointer;
}
</style>