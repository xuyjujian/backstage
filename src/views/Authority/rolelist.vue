<template>
  <div class="df jc_c ai_c">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div class="mb">
            <el-button type="primary" @click="addvisible = true">添加角色</el-button>
          </div>
          <!-- 添加表单 -->
          <Myform
            :visible.sync="addvisible"
            :formdata="addformadddata"
            @cancel="addcancel"
            @ok="addok"
          ></Myform>
          <!-- 配置表单 -->
          <Myform
            :visible.sync="editvisible"
            :formdata="editformadddata"
            @cancel="editcancel"
            @ok="editok"
          ></Myform>
          <Mytable
            :tableData="roleslist"
            :indexoption="indexoption"
            :columns="columns"
            :expandOptions="expandOptions"
          >
            <template v-slot:expand="scope">
              <div v-if="scope.scope.row.children&&scope.scope.row.children.length>0">
                <div v-for="item in scope.scope.row.children" :key="item.id" class="df bo">
                  <!-- 蓝快 -->
                  <div class="df ai_c" style="margin-right:150px;"  v-if="item.children&&item.children.length>0">
                    <el-tag
                      closable
                      :disable-transitions="false"
                      @close="handleClose(scope,item.id)"
                    >{{item.authName}}</el-tag>
                    <div class="ml">
                      <i class="el-icon-caret-right"></i>
                    </div>
                  </div>
                  <!-- 第二次循环 -->
                  <div v-if="item.children&&item.children.length>0">
                    <div  class="pad df bo" v-for="item1 in item.children" :key="item1.id" >
                      <!-- 绿块 -->
                      <div class="df ai_c" style="margin-right:100px;" v-if="item1.children&&item1.children.length>0">  
                        <el-tag
                          type="success"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(scope,item1.id)"
                        >{{item1.authName}}</el-tag>
                        <div class="ml">
                          <i class="el-icon-caret-right"></i>
                        </div>
                      </div>

                      <div v-if="item1.children&&item1.children.length>0" class="df fw order">
                        <div v-for="item2 in item1.children" :key="item2.id" class="pad">
                          <div class="df ai_c">
                            <el-tag
                              type="warning"
                              closable
                              :disable-transitions="false"
                              @close="handleClose(scope,item2.id)"
                            >{{item2.authName}}</el-tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="df jc_c ai_c">
                <div>暂无权限</div>
              </div>
            </template>
            <template v-slot:action="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button @click="edit(scope)" size="small" type="primary">编辑</el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button @click="del(scope)" size="small" type="danger">删除</el-button>
              </el-tooltip>
              <el-tooltip content="分配权限" placement="top">
                <el-button @click="ordermsg(scope)" size="small" type="warning">分配权限</el-button>
              </el-tooltip>
            </template>
          </Mytable>
          <el-dialog
            title="分配权限"
            :visible.sync="configurevisible"
            :show-close="false"
            width="50%"
            @close="closeSettingDialog"
          >
            <el-tree
              :data="treejuriddiction"
              :props="treeProps"
              show-checkbox
              node-key="id"
              default-expand-all
              :default-checked-keys="defKeys"
              ref="treeRef"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="configurevisible = false">取 消</el-button>
              <el-button type="primary" @click="setok">确 定</el-button>
            </span>
          </el-dialog>
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
      id: "",
      // 是否有叠层
      expandOptions: true,
      //序号
      indexoption: {
        label: "#",
        width: "200",
        showindex: true,
        indexMethod: index => {
          return index + 1;
        }
      },
      //表头属性
      columns: [
        {
          label: "职位",
          prop: "roleName",
          width: "300",
          align: "center"
        },
        {
          label: "描述",
          prop: "roleDesc",
          width: "300",
          align: "center"
        },
        {
          label: "操作",
          width: "300"
        }
      ],
      //添加dialog开关
      addvisible: false,
      //添加表单
      addformadddata: [
        {
          label: "角色名",
          type: "input",
          value: "",
          prop: "roleName",
          attrs: {
            placeholder: "请输入角色",
            clearable: true
          },
          rules: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { min: 2, max: 8, message: "用户名在2~8位", trigger: "blur" }
          ]
        },
        {
          label: "角色描述",
          type: "input",
          value: "",
          prop: "roleDesc",
          attrs: {
            placeholder: "请描述角色",
            clearable: true
          }
        }
      ],
      //编辑开关
      editvisible: false,
      //编辑表单
      editformadddata: [
        {
          label: "角色名",
          type: "input",
          value: "",
          prop: "roleName",
          attrs: {
            placeholder: "请输入角色",
            clearable: true
          },
          rules: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { min: 2, max: 8, message: "用户名在2~8位", trigger: "blur" }
          ]
        },
        {
          label: "角色描述",
          type: "input",
          value: "",
          prop: "roleDesc",
          attrs: {
            placeholder: "请描述角色",
            clearable: true
          }
        }
      ],
      // 分配开关
      configurevisible: false,
      // 树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children"
      },
      // 树形控件的属性绑定对象
      defKeys: []
    };
  },
  methods: {
    ...rolesActions([
      "getroles",
      "puteditrole",
      "deleteroles",
      "gettreejurisdiction",
      "setRoles",
      "deletright"
    ]),
    //取消添加
    addcancel(val) {
      this.$message("取消添加");
      this.addvisible = false;
      val.formref.resetFields();
    },
    //确定添加
    addok(val) {
      val.formref.validate(valid => {
        if (valid) {
          this.$store.dispatch("roles/postaddroles", {
            roleName: val.options.roleName,
            roleDesc: val.options.roleDesc
          });
          this.addvisible = false;
          val.formref.resetFields();
        } else {
          this.$message.error("填写错误请检查");
        }
      });
    },
    //编辑开关
    edit(scope) {
      this.editformadddata.map(item => {
        for (let i in scope.scope.row) {
          if (item.prop === i) {
            item.value = scope.scope.row[i];
          }
        }
      });
      this.editvisible = true;
    },
    //取消编辑
    editcancel(val) {
      this.$message("取消添加");
      this.editvisible = false;
      val.formref.resetFields();
    },
    //确定编辑
    editok(val) {
      this.roleslist.map(item => {
        if (item.roleName === val.options.roleName) {
          this.id = item.id;
        }
      });
      val.formref.validate(valid => {
        if (valid) {
          this.puteditrole({
            id: this.id,
            roleName: val.options.roleName,
            roleDesc: val.options.roleDesc
          });
        } else {
          this.$message.error("填写错误请检查");
        }
      });
      this.editvisible = false;
      val.formref.resetFields();
    },
    //删除
    del(scope) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteroles({
            id: scope.scope.row.id
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
    handleClose(tag, scope) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let roleId = tag.scope.row.id;
          let rightId = scope;
          this.deletright({ roleId, rightId });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分配开关
    ordermsg(scope) {
      this.roleId = scope.scope.row.id;
      this.configurevisible = true;
      this.gettreejurisdiction();
      this.getLeafKeys(scope.scope.row, this.defKeys);
      console.log(scope);
    },
    // 获取当前角色拥有的权限
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => this.getLeafKeys(item, arr));
    },
    closeSettingDialog() {
      this.defKeys = [];
    },
    //确定分配权限
    setok() {
      // console.log(this.$refs.treeRef.getCheckedKeys())
      // console.log(this.$refs.treeRef.getHalfCheckedKeys())
      console.log(this.$refs.treeRef.getCheckedKeys())
      // let keys = [
      //   ...this.$refs.treeRef.getCheckedKeys(),
      //   ...this.$refs.treeRef.getHalfCheckedKeys()
      // ];
      let keys= []
      this.$refs.treeRef.getCheckedKeys().map(item=>{
        keys.push(item)
      })
      this.$refs.treeRef.getHalfCheckedKeys().map(item=>{
        keys.push(item)
      })
      let rids = keys.join(",");
      console.log(rids);
      console.log(keys)
      let roleId = this.roleId;
      console.log(roleId)
      this.setRoles({ roleId, rids });
      this.configurevisible = false
    }
  },
  mounted() {
    this.getroles();
  },
  watch: {},
  computed: {
    ...rolesState(["roleslist", "treejuriddiction"])
  }
};
</script>

<style scoped lang='scss'>
.el-card {
  width: 70vw !important;
}
.order {
  width: 700px;
}
</style>