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
              <el-button type="primary" @click="visible = true">添加用户</el-button>
            </div>
          </div>
          <Myform :visible.sync="visible" @cancel="cancel" @ok="ok" :formdata="formadddata">
            <!-- <template v-slot:footer></template> -->
          </Myform>
          <Myform
            :visible.sync="editvisible"
            @cancel="editcancel"
            @ok="editok"
            :formdata="editformadddata"
          ></Myform>
          <Myform
            :visible.sync="ordervisible"
            @cancel="rolecancel"
            @ok="roleok"
            :formdata="rolesformadddata"
            :text="text"
          >
            <template v-slot:header>
              <div>当前用户：{{text.nowusername}}</div>
              <div>当前角色：{{text.nowrole_name}}</div>
            </template>
          </Myform>
          <Mytable
            :tableData="userslist"
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
            <template v-slot:state="scope">
              <el-switch v-model="scope.scope.row.mg_state" @change="change(scope)"></el-switch>
            </template>
            <template v-slot:action="scope">
              <el-tooltip content="编辑角色" placement="top">
                <el-button @click="edituser(scope)" size="small" type="primary">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>

              <el-tooltip content="删除角色" placement="top">
                <el-button @click="deluser(scope)" size="small" type="danger">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="分配角色" placement="top">
                <el-button @click="ordermsg(scope)" size="small" type="warning">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
            </template>
          </Mytable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: uertState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    let phoneCheck = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入正确的手机号"));
    };
    return {
      //显示数据为userslist
      //总个数为total
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
      visible: false,
      editvisible: false,
      ordervisible: false,
      //表格配置项
      columns: [
        {
          label: "姓名",
          prop: "username",
          width: "200",
          align: "center"
        },
        {
          label: "角色",
          prop: "role_name",
          width: "200",
          align: "center"
        },
        {
          label: "电话",
          prop: "mobile",
          width: "200",
          align: "center"
        },
        {
          label: "邮箱",
          prop: "email",
          width: "200",
          align: "right"
        },
        {
          label: "状态",
          prop: "mg_state",
          width: "200",
          slots: "state"
        },
        {
          label: "操作",
          width: "300"
        }
      ],
      formadddata: [
        {
          label: "姓名",
          type: "input",
          value: "",
          prop: "username",
          attrs: {
            placeholder: "请输入姓名",
            clearable: true
          },
          rules: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { min: 2, max: 8, message: "用户名在2~8位", trigger: "blur" }
          ]
        },
        {
          label: "密码",
          type: "input",
          value: "",
          prop: "password",
          attrs: {
            placeholder: "请输入密码",
            clearable: true,
            "show-password": true
          },
          rules: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            //   { validator: validatePass, trigger: "blur" },
            { min: 6, max: 15, message: "密码在6~15位", trigger: "blur" }
          ]
        },
        {
          label: "电话",
          type: "input",
          prop: "mobile",
          value: "",
          attrs: {
            placeholder: "请输入电话",
            clearable: true
          },
          rules: [
            { required: true, message: "电话不能为空", trigger: "blur" },
            {
              validator: phoneCheck,
              message: "请输入正确的电话",
              trigger: "blur"
            }
          ]
        },
        {
          label: "邮箱",
          type: "input",
          prop: "email",
          value: "",
          attrs: {
            placeholder: "请输入邮箱",
            clearable: true
          },
          rules: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { type: "email", message: "请输入正确邮箱", trigger: "blur" }
          ]
        }
        // {
        //   label: "分配角色",
        //   type: "select",
        //   value: "",
        //   prop:"role"
        //   children: [
        //     {
        //       type: "option",
        //       value: "选项1",
        //       label: "123"
        //     },
        //     {
        //       type: "option",
        //       value: "选项2",
        //       label: "123"
        //     },
        //     {
        //       type: "option",
        //       value: "选项3",
        //       label: "123"
        //     }
        //   ]
        // }
      ],
      editformadddata: [
        {
          label: "姓名",
          type: "input",
          value: "",
          prop: "username",
          attrs: {
            placeholder: "请输入姓名",
            clearable: true,
            disabled: true
          },
          rules: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { min: 2, max: 8, message: "用户名在2~8位", trigger: "blur" }
          ]
        },
        {
          label: "电话",
          type: "input",
          prop: "mobile",
          value: "",
          attrs: {
            placeholder: "请输入电话",
            clearable: true
          },
          rules: [
            { required: true, message: "电话不能为空", trigger: "blur" },
            {
              validator: phoneCheck,
              message: "请输入正确的电话",
              trigger: "blur"
            }
          ]
        },
        {
          label: "邮箱",
          type: "input",
          prop: "email",
          value: "",
          attrs: {
            placeholder: "请输入邮箱",
            clearable: true
          },
          rules: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { type: "email", message: "请输入正确邮箱", trigger: "blur" }
          ]
        }
      ],
      rolesformadddata: [
        {
          label: "分配角色",
          type: "select",
          value: "",
          prop: "role"
          // children: []
        }
      ],
      id: "",
      text: {
        nowusername: "",
        nowrole_name: ""
      }
    };
  },
  methods: {
    ...userActions([
      "getuserslist",
      "putuserstate",
      "putusermsg",
      "deleteueser",
      "getroles",
      "putrole"
    ]),
    //分配角色
    ordermsg(scope) {
      let arr = [];
      console.log(scope);
      this.text.nowusername = scope.scope.row.username;
      this.text.nowrole_name = scope.scope.row.role_name;
      this.roleslist.map(item => {
        let value = item.id;
        let label = item.roleName;
        arr.push({
          type: "option",
          value: value,
          label: label
        });
      });
      // this.rolesformadddata.children = arr;
      this.$set(this.rolesformadddata[0], "children", arr);
      console.log(this.rolesformadddata.children);
      this.ordervisible = true;
    },
    roleok(val) {
      val.formref.validate(valid => {
        if (valid) {
           this.userslist.map(item=>{
             if(item.username===this.text.nowusername){
               this.id = item.id;
             }
           })
          this.putrole({
            id:this.id,
            rid:val.options.role,
             query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          })
          this.ordervisible = false;
          console.log(val)
          val.formref.resetFields();
        }else{
           this.$message.error("填写错误请检查");
        }
      });
    },
    rolecancel(val) {
      this.$message("取消修改");
      this.ordervisible = false;
      val.formref.resetFields();
    },
    edituser(scope) {
      this.editformadddata.map(item => {
        for (let i in scope.scope.row) {
          if (item.prop === i) {
            item.value = scope.scope.row[i];
          }
        }
      });
      this.editvisible = true;
      console.log(this.editformadddata);
      console.log(scope);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getuserslist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getuserslist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //添加对话框点击取消
    cancel(val) {
      this.$message("取消添加");
      this.visible = false;
      val.formref.resetFields();
    },

    ok(val) {
      val.formref.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/postadduser", {
            username: val.options.username,
            password: val.options.password,
            email: val.options.email,
            mobile: val.options.mobile,
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          });
          console.log(val);
          this.visible = false;
          val.formref.resetFields();
        } else {
          this.$message.error("填写错误请检查");
        }
      });
    },
    change(scope) {
      console.log(scope);
      console.log(scope.scope.row.id);
      this.putuserstate({
        uId: scope.scope.row.id,
        type: scope.scope.row.mg_state
      });
    },
    editcancel(val) {
      this.$message("取消编辑");
      this.editvisible = false;
      val.formref.resetFields();
    },
    editok(val) {
      this.userslist.map(item => {
        if ((item.username === val.options.username)) {
          this.id = item.id;
        }
      });
      val.formref.validate(valid => {
        if (valid) {
          this.putusermsg({
            id: this.id,
            email: val.options.email,
            mobile: val.options.mobile,
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          });
          console.log(val);

          this.editvisible = false;
          val.formref.resetFields();
        } else {
          this.$message.error("填写错误请检查");
        }
      });
    },
    deluser(scope) {
      console.log(scope.scope);
      console.log("qqq");
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteueser({
            id: scope.scope.row.id,
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
    search() {
      this.getuserslist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    }
  },
  mounted() {
    this.getroles();
    this.getuserslist({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    });
  },
  watch: {},
  computed: {
    ...uertState(["userslist", "total", "roleslist"])
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