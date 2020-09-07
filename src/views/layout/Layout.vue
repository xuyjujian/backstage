<template>
  <div>
    <el-container>
      <el-header>
          <Tophome></Tophome>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <Lefthome></Lefthome>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Tophome from "../../components/layout/Tophome";
import Lefthome from "../../components/layout/Lefthome";
export default {
  name: "",
  props: {},
  components: {
    Lefthome,
    Tophome
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>