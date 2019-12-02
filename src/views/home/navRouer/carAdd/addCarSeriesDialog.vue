<template>
  <div>
    <a-modal
      title="车系车型添加"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="车系" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select
            v-decorator="[
                'gender',
                { rules: [{ required: true, message: 'Please select your gender!' }] },
              ]"
            placeholder="Select a option and change input text above"
            @change="handleSelectChange"
          >
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="添加车系" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ModalText: "",
      visible: true,
      confirmLoading: false,

      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  methods: {
    // 显示与关闭本对话框
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>
<style lang='stylus' scoped></style>