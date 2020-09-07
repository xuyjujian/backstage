<template>
  <div>
    <el-form :model="formOptions" :rules="rules" ref="form">
      <template v-for="(item,index) in formdata">
        <el-form-item :key="index" :label="item.label" v-if="!item.children" :prop="item.prop">
          <!-- 动态渲染组件 -->
          <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="formOptions[item.prop]"></component>
        </el-form-item>
        <el-form-item :key="index" :label="item.label" v-else>
          <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="formOptions[item.prop]">
            <component
              v-for="(child,idx) in item.children"
              :key="idx"
              :is="`el-${child.type}`"
              :label="child.label"
              :value="child.value"
            ></component>
          </component>
        </el-form-item>
      </template>
    </el-form>
    <slot name="footer" v-if="$slots.footer"></slot>
    <span slot="footer" v-else>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    //表单数据
    formdata: {
      type: Array,
      required: true
    },
    //自定义数据
    text: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      formOptions: [],
      rules: []
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    cancel() {
      let option = JSON.parse(JSON.stringify(this.formOptions));
      this.$emit("cancel", {
        options: option,
        formref: this.$refs.form
      });
      this.formdata.map(item => {
        if (item.children) this.formOptions[item.prop] = "";
      });
    },
    ok() {
      let option = JSON.parse(JSON.stringify(this.formOptions));
      this.$emit("ok", {
        options: option,
        formref: this.$refs.form
      });
      this.formdata.map(item => {
        if (item.children) this.formOptions[item.prop] = "";
      });
    },
    setInitValue() {
      let options = {};
      let rules = {};
      this.formdata.map(item => {
        rules[item.prop] = item.rules;
        options[item.prop] = item.value;
      });
      //    //看到插槽的内容：this.$slots
      //    console.log(this.$slots)
      this.formOptions = JSON.parse(JSON.stringify(options));
      this.rules = JSON.parse(JSON.stringify(rules));
    }
  },
  mounted() {
    this.setInitValue();
    console.log(this.formOptions, "123");
  },
  watch: {
    //深度监听，监听数组和对象
    formdata: {
      handler() {
        this.setInitValue();
      },
      deep: true
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>