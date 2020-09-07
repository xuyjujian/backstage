<template>
  <div>
    
    <el-table :data="tableData" v-loading="!tableData.length" border>
      <!-- 序列号 -->
      <el-table-column
      type="index"
        v-if="indexoption&&indexoption.showindex"
        :label="indexoption.label"
        :prop="indexoption.prop"
        :align="indexoption.align"
        :width="indexoption.widh"
        :index="indexoption.indexMethod"
      ></el-table-column>
      <!-- 展开项 -->
      <el-table-column type="expand" v-if="expandOptions">
        <template slot-scope="scope">
          <slot name="expand" :scope="scope"></slot>
        </template>
      </el-table-column>
      <template v-for="(item,index) in columns">
        <el-table-column
          v-if="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.widh"
          :key="index"
        >
          <template slot-scope="scope">
            <slot v-if="item.slots" :name="item.slots" :scope="scope"></slot>
            <slot v-if="item.clolor" :name="item.clolor" :scope="scope"></slot>
            <template v-if="!item.slots&&!item.clolor">{{scope.row[item.prop]}}</template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :label="item.label"
          :align="item.align"
          :width="item.widh"
        >
          <template slot-scope="scope">
            <slot name="action" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showpagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="pageSizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    //表单数据
    tableData: {
      type: Array,
      required: true
    },
    //表头属性
    columns: {
      type: Array,
      required: true
    },
    //分页总数
    total: {
      type: [String, Number],
      default: 0
    },
    //是否分页
    showpagination: {
      type: Boolean,
      default: false
    },
    //第几页
    pagenum: {
      type: Number,
      default: 1
    },
    //页条数选择项
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 30]
    },
    //每页条数
    pagesize: {
      type: Number,
      default: 5
    },
    //表头序号
    indexoption: {
      type: Object
    },
    //是否折叠
    expandOptions: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>