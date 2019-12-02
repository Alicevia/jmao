<template>
  <div>
    <a-modal
      title="产品添加"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :maskClosable="false"
      :keyboard="false"

    >
      <a-form :form="form">
        <a-form-item label="产品名称" :label-col="{ span: 8}" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['productName', { rules: [{ required: true, message: '请输入产品名称' }] }]"
          />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['remarks',{  rules: [{ required: true, message: '请输入产品备注' }],initialValue:'备注'}]"
          />
        </a-form-item>
        <a-form-item label="产品图片" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <PicUpload
            @getUploadImg="getUploadImg"
            v-decorator="[
            'productPic', 
           
           ]"
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
  props: ['showDataToChild'],
  data() {
    return {
      ModalText: "",
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      img: ""
    };
  },
  created() {
    
  },
  mounted() {

  },
  beforeUpdate(){
     if (this.showDataToChild.productName) {
        this.form.setFieldsValue({
          remarks: this.showDataToChild.remarks,
          productName: this.showDataToChild.productName
        });
      }

  },
  updated(){

  },
  computed: {
    ...mapState(["activePath"]),
    visible: {
      get() {
        return this.$route.path === this.activePath ? true : false;
      }
    }
  },
  methods: {
    ...mapActions(["modiActivePath", "addProductInfo"]),

    // 获取到upload中的图片信息
    getUploadImg(img) {
      this.img = img;
    },
    // 关闭弹窗
    handleCancel() {
      this.modiActivePath("");
    },
    // 弹窗的确定按钮
    handleOk(e) {
      e.preventDefault();

     
      if (this.img) {
        this.form.setFieldsValue({ productPic: this.img });
      }
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          let formdata = new FormData();
          for (const key in values) {
            if (values.hasOwnProperty(key) && values[key]) {
              if (key === "productPic") {
                console.log("----");
                formdata.append("file", values[key]);
              } else {
                formdata.append([key], values[key]);
              }
            }
          }
          this.addProductInfo(formdata).then(() => {
            this.modiActivePath("");
          });
        }
      });
    }
  },
  components: { PicUpload }
};
</script>
<style lang='stylus' scoped></style>