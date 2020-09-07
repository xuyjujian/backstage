<template>
  <div class="df jc_c ai_c">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div class="df">
            <el-input placeholder="请输入你想搜索的名称" v-model="query" @keydown.enter="search" clearable>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <div class="ml">
              <el-button type="primary" @click="addgoods">添加商品</el-button>
            </div>
          </div>
          <Mytable
            :tableData="goodslist"
            :columns="columns"
            :total="total"
            :pagenum="pagenum"
            :pagesize="pagesize"
            :pageSizes="pageSizes"
            :showpagination="showpagination"
            :indexoption="indexoption"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
          >
            <template v-slot:action="scope">
              <el-button @click="editgoods(scope)" size="small" type="primary">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button @click="delgoods(scope)" size="small" type="danger">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </Mytable>
          <!-- 编辑 -->
          <Myform
            :visible.sync="editvisible"
            @cancel="editcancel"
            @ok="editok"
            :formdata="editformadddata"
          ></Myform>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const goodsModule = createNamespacedHelpers("goods");
const { mapState: goodstState, mapActions: goodsActions } = goodsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 5,
      pageSizes: [5, 10, 20, 30],
      showpagination: true,
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
          label: "商品名称",
          prop: "goods_name",
          width: "300",
          align: "center"
        },
        {
          label: "商品价格（元）",
          prop: "goods_price",
          width: "200",
          align: "center"
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          width: "200",
          align: "center"
        },
        {
          label: "创建时间",
          prop: "add_time",
          width: "200",
          align: "center"
        },
        {
          label: "操作",
          width: "200"
        }
      ],
      editvisible: false,
      id: "",
      editformadddata: [
        {
          label: "商品名称",
          type: "input",
          value: "",
          prop: "goods_name",
          attrs: {
            placeholder: "请输入姓名",
            clearable: true
          },
          rules: [
            { required: true, message: "商品名不能为空", trigger: "blur" }
          ]
        },
        {
          label: "商品价格",
          type: "input",
          value: "",
          prop: "goods_price",
          attrs: {
            placeholder: "请输入价格",
            clearable: true,
            type: "number"
          },
          rules: [
            { required: true, message: "商品价格不能为空", trigger: "blur" }
          ]
        },
        {
          label: "商品数量",
          type: "input",
          value: "",
          prop: "goods_number",
          attrs: {
            placeholder: "请输入数量",
            clearable: true,
            type: "number"
          },
          rules: [
            { required: true, message: "商品数量不能为空", trigger: "blur" }
          ]
        },
        {
          label: "商品重量",
          type: "input",
          value: "",
          prop: "goods_weight",
          attrs: {
            placeholder: "请输入商品重量",
            clearable: true,
            type: "number"
          },
          rules: [
            { required: true, message: "商品重量不能为空", trigger: "blur" }
          ]
        }
      ]
    };
  },
  methods: {
    ...goodsActions(["getgoods", "putgoods", "deletegoods"]),
    //换条
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getgoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //换页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getgoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //搜索
    search() {
      this.getgoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //编辑
    editgoods(scope) {
      this.id = scope.scope.row.goods_id;
      console.log(this.id);
      this.editformadddata.map(item => {
        for (let i in scope.scope.row) {
          if (item.prop === i) {
            item.value = scope.scope.row[i];
          }
        }
      });
      this.editvisible = true;
      console.log(scope);
    },
    //取消编辑
    editcancel(val) {
      this.$message("取消编辑");
      this.editvisible = false;
      val.formref.resetFields();
    },
    //确定编辑
    editok(val) {
      val.formref.validate(valid => {
        if (valid) {
          this.putgoods({
            id: this.id,
            goods_name: val.options.goods_name,
            goods_price: val.options.goods_price,
            goods_number: val.options.goods_number,
            goods_weight: val.options.goods_weight
          });
          this.editvisible = false;
          val.formref.resetFields();
        } else {
          this.$message.error("填写错误请检查");
        }
      });
      console.log(val);
    },
    //删除
    delgoods(scope) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(scope);
          this.deletegoods({
            id: scope.scope.row.goods_id,
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加商品
    addgoods(){
      this.$router.push('/goods/addgood')
    }
  },
  mounted() {
    this.getgoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    });
  },
  watch: {},
  computed: {
    ...goodstState(["goodslist", "total"])
  }
};
</script>

<style scoped lang='scss'>
.el-card {
  width: 70vw !important;
}
.el-input {
  width: 500px;
}
</style>