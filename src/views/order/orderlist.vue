<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div>
            <!-- 搜索框 -->
            <div class="df fd_c">
              <el-input placeholder="请输入你想搜索的名称" v-model="input" clearable @keydown.enter="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
              <div>
                <!-- 表单 -->
                <el-table :data="tableData" style="width: 100%" stripe>
                  <el-table-column type="index" :index="indexMethod" label="#"></el-table-column>
                  <el-table-column prop="order_number" label="订单编号" width="200"></el-table-column>
                  <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
                  <el-table-column prop="pay_status" label="是否付款" width="100">
                    <template slot-scope="scope">
                      <div v-if="scope.row.pay_status==='0'">
                        <el-tag type="success">已付款</el-tag>
                      </div>
                      <div v-if="scope.row.pay_status==='1'">
                        <el-tag type="danger">未付款</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
                  <el-table-column prop="update_time" label="下单时间" width="200"></el-table-column>
                  <el-table-column fixed="right" label="订单编号" width="200">
                    <template slot-scope="scope">
                      <el-button @click="modify(scope)" size="small" type="primary">
                        <i class="el-icon-edit"></i>
                      </el-button>
                      <el-button @click="ordermsg(scope)" type="danger" size="small">
                        <i class="el-icon-location-outline"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="num"
                layout="total, sizes, prev, pager, next, jumper"
                :total="alltotal"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
     <el-cascader
    :options="cityOptions"
    :value="city"
    @change="changeProvince"
    change-on-select
  >
  </el-cascader>
    </el-dialog>-->
    <el-dialog title="物流信息" :visible.sync="dialogFormVisible1">
      <div>
  <el-steps direction="vertical" :active="1">
    <el-step v-for="item in logisticsmessage" :key="item.ftime" :title='item.context' :description="item.time"></el-step>
  </el-steps>
</div>
      </el-dialog>
  </div>
</template>

<script>
// import cityOptions from '../../provinces-china-master/provinces-china-master/city_data2017_element'
import { createNamespacedHelpers } from "vuex";
const orderModule = createNamespacedHelpers("order");
const { mapState: orderState, mapActions: orderActions } = orderModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      input: "",
      tableData: [],
      currentPage4: 1,
      num: 10,
      alltotal: null,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      id: ""
      // cityOptions: cityOptions,
    };
  },
  methods: {
    ...orderActions(["getdrserlist","getlogisticsmessage"]),
    //物流信息
    ordermsg(scope) {
      this.id=scope.row.order_id
      this.getlogisticsmessage({
        id:804909574412544600
      })
      this.dialogFormVisible1 = true;
    },
    //表头序列号
    indexMethod(index) {
      return index + 1;
    },
    //打开修改地址
    modify(scope) {
      // this.dialogFormVisible = true;
      console.log(scope);
    },
    //切换每页个数
    handleSizeChange(val) {
      this.num = val;
      this.currentPage4 = 1;
      console.log(this.input);
      console.log(this.num);
      this.getdrserlist({
        query: this.input,
        pagenum: this.currentPage4,
        pagesize: this.num
      });
    },
    //切换页数
    handleCurrentChange(val) {
      this.currentPage4 = val;
      console.log(this.currentPage4);
      this.getdrserlist({
        query: this.input,
        pagenum: this.currentPage4,
        pagesize: this.num
      });
    },
    //搜索
    search() {
      this.getdrserlist({
        query: this.input,
        pagenum: this.currentPage4,
        pagesize: this.num
      });
    }
  },
  mounted() {
    this.getdrserlist({
      query: this.input,
      pagenum: this.currentPage4,
      pagesize: this.num
    });
    this.tableData = this.orderlist;
    this.alltotal = this.total;
  },
  watch: {
    orderlist() {
      this.tableData = this.orderlist;
      this.alltotal = this.total;
    }
  },
  computed: {
    ...orderState(["orderlist", "total","logisticsmessage"])
  }
};
</script>

<style scoped lang='scss'>
.el-card {
  width: 80vw !important;
}
.el-input{
  width: 500px;
}
</style>