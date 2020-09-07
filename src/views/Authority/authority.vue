<template>
  <div class="df jc_c ai_c">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <Mytable :indexoption="indexoption" :tableData="jurisdiction" :columns="columns">
            <template v-slot:clolor="scope">
              <div v-if="scope.scope.row.level==='0'">
              <el-tag >一级</el-tag>
            </div>
            <div v-if="scope.scope.row.level==='1'">
              <el-tag type="success">二级</el-tag>
            </div>
            <div v-if="scope.scope.row.level==='2'">
              <el-tag type="warning">三级</el-tag>
            </div>
            </template>
          </Mytable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const rolesModule = createNamespacedHelpers("roles");
const { mapState: rolesState, mapActions: rolesActions } = rolesModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      indexoption: {
        label: "#",
        width: "200",
        showindex: true,
        indexMethod: index => {
          return index + 1;
        }
      },
      columns: [
        {
          label: "权限名称",
          prop: "authName",
          width: "400",
          align: "center"
        },
        {
          label: "状态",
          prop: "mg_state",
          width: "400",
          clolor: "clolor",
          align: "center"
        }
      ]
    };
  },
  methods: {
    ...rolesActions(["getjurisdiction"])
  },
  mounted() {
    this.getjurisdiction();
  },
  watch: {},
  computed: {
    ...rolesState(["jurisdiction"])
  }
};
</script>

<style scoped lang='scss'>
.el-card {
  width: 70vw !important;
}
</style>