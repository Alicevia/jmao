<template>
  <div>
    <a-modal
      title="车系(车型)添加"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :maskClosable="false"
      :keyboard="false"
      :afterClose="closeCallBack"
    >
      <a-form :form="form">
        <a-form-item label="车系" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-select
            v-decorator="['parentId',{initialValue:showDataToChild.parentId}]"
            @change="handleSelectChange"
          >
            <a-select-option :value="0">默认为添加车系</a-select-option>
            <a-select-option
              v-for="item in allCarSeries"
              :key="item.id"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="seriesOrVehicle" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['name', { 
            rules: [{ required: true, message: '请输入车型或车系名称'}],
                initialValue:showDataToChild.seriesName?showDataToChild.seriesName:showDataToChild.vehicleName
             }]"
          />
        </a-form-item>
        <a-form-item label="产品图片" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <PicUpload
            @getUploadImg="getUploadImg"
            v-decorator="[
             'file',
             { rules: [{ required: true, message: '请上传车系或车型图片' }] }
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
      form: this.$form.createForm(this, { name: "addCar" }),
      img: "",
      seriesOrVehicle: "添加车系"
    };
  },

  computed: {
    ...mapState(["activePath", "allCarSeries"]),
    visible: {
      get() {
        return this.$route.path === this.activePath ? true : false;
      }
    },

    pictureToChild() {
      return this.showDataToChild.seriesPic||this.showDataToChild.vehiclePic
    }
  },
  created() {
    this.getAllCarSeries();
  },
  mounted() {},
  updated() {
    console.log(this.showDataToChild);
  },
  methods: {
    ...mapActions([
      "modiActivePath",
      "addCarSeriesOrVehicle",
      "modiCarSeriesOrVehicle",
      "getAllCarSeries"
    ]),
    // 获取到upload中的图片信息
    getUploadImg(img) {
      this.img = img;
    },
    // 关闭弹窗
    handleCancel() {
      // this.$emit('clearProductToChild')
      this.modiActivePath("");
    },
    // 关闭之后的回调
    closeCallBack() {
      // 清空表单
      this.form.resetFields();
      this.$emit("clearProductToChild");
    },
    // 弹窗的确定按钮
    handleOk(e) {
      e.preventDefault();
      if (this.img) {
        this.form.setFieldsValue({ file: this.img });
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          let formdata = new FormData();
          for (const key in values) {
            if (!values.hasOwnProperty(key)) return;
            formdata.append([key], values[key]);
          }
          if (this.showDataToChild.id) {
            formdata.append('id',this.showDataToChild.id)
            this.modiCarSeriesOrVehicle(formdata).then(() => {
              this.modiActivePath("");
            });
          } else {
            this.addCarSeriesOrVehicle(formdata).then(() => {
              this.modiActivePath("");
            });
          }
        }
      });
    },
    handleSelectChange(item) {
      if (item === 0) {
        this.seriesOrVehicle = "添加车系";
      } else {
        this.seriesOrVehicle = "添加车型";
      }
    }
  },
  components: { PicUpload }
};
</script>
<style lang='stylus' scoped></style>