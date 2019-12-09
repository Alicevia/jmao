<template>
  <div>
    <a-modal
      :title="showDataToChild.id?'产品修改':'产品添加'"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :maskClosable="false"
      :keyboard="false"
      :afterClose="closeCallBack"
      :destroyOnClose="true"
    >
      <a-form :form="form">
        <a-form-item label="产品名称" :label-col="{ span: 8}" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['productName', { rules: [{ required: true, message: '请输入产品名称' }],initialValue:showDataToChild.productName }]"
          />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['remarks',{  rules: [{ required: true, message: '请输入产品备注' }],initialValue:showDataToChild.remarks}]"
          />
        </a-form-item>
        <a-form-item label="产品图片" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <PicUpload
            @getUploadImg="getUploadImg"
            v-decorator="[
            'file',
            {  rules: [{ required: showDataToChild.id?false:true, message: '请上传产品图片' }]}
           ]"
            :picture="pictureToChild"
          ></PicUpload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import PicUpload from "@/components/PicUpload";
import { reqAddProductCategory } from "@/api";
import { mapState, mapActions } from "vuex";
export default {
  props: ["showDataToChild"],
  data() {
    return {
      ModalText: "",
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      img: ""
    };
  },

  computed: {
    ...mapState(["activePath"]),
    visible: {
      get() {
        return '/home/productadd' === this.activePath ? true : false;
      }
    },
    pictureToChild() {
      return this.showDataToChild.productPic;
    }
  },
  methods: {
    ...mapActions(["modiActivePath", "addProductInfo", "modiProductInfo"]),
    // 获取到upload中的图片信息
    getUploadImg(img) {
      this.img = img;
    },
    // 关闭弹窗
    handleCancel() {
      this.modiActivePath("");
    },
    // 关闭之后的回调
    closeCallBack() {
      // 清空表单
      this.form.resetFields();
      this.$emit("clearProductToChild");
    },
    // 弹窗的确定按钮 处理添加修改
    handleOk(e) {
      e.preventDefault();
      if (this.img) {
        this.form.setFieldsValue({ file: this.img });
      }
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let formdata = new FormData();
          for (const key in values) {
            if (!values.hasOwnProperty(key)) return;
            if (key === "file" && !values["file"]) {
              continue;
            }
            formdata.append([key], values[key]);
          }
          if (this.showDataToChild.id) {
            formdata.append("id", this.showDataToChild.id);
            this.modiProductInfo(formdata).then(() => {
              this.modiActivePath("");
            });
          } else {
            this.addProductInfo(formdata).then(() => {
              
              this.modiActivePath("");
            });
          }
        }
      });
    }
  },
  components: { PicUpload }
};
</script>
<style lang='stylus' scoped></style>