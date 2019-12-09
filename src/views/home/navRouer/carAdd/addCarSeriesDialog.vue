<template>
  <div>
    <a-modal
      :title="showDataToChild.id?'车系车型修改':'车系车型添加'"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :maskClosable="false"
      :keyboard="false"
      :afterClose="closeCallBack"
      :destroyOnClose='true'
    >
      <a-form :form="form">
        <a-form-item label="车系" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-select
            v-decorator="['parentId',
            {initialValue:showDataToChild.parentId||0}]"
            @change="handleSelectChange"
            :disabled='showDataToChild.parentId===0?true:false'
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
             { rules: [{ required: showDataToChild.id?false:true, message: '请上传车系或车型图片' }] }
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
    ...mapState(["activePath", "allCarSeries", "currentCarSeriesPage"]),
    visible: {
      get() {
        return '/home/caradd'=== this.activePath ? true : false;
      }
    },
    // 给upload的图片属性
    pictureToChild() {
      return this.showDataToChild.seriesPic || this.showDataToChild.vehiclePic;
    }

  },
  created() {
    // 获取所有车系用来添加车型
    this.getAllCarSeries();
  },

  methods: {
    ...mapActions([
      "modiActivePath",
      "addCarSeriesOrVehicle",
      "modiCarSeriesOrVehicle",
      "getAllCarSeries",
      "getCarSeriesVehicleInfo"
    ]),
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
      this.$emit("clearCarInfoToChild");
    },
    // 弹窗的确定按钮 添加或者是修改
    handleOk(e) {
      e.preventDefault();
      if (this.img) {
        this.form.setFieldsValue({ file: this.img });
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          let formdata = new FormData();
          for (const key in values) {
            if (!values.hasOwnProperty(key)) return;
            if (key==='file' && !values['file']) {
              continue
            }
            formdata.append([key], values[key]);
          }
          if (this.showDataToChild.id) {
            formdata.append("id", this.showDataToChild.id);
            this.modiCarSeriesOrVehicle(formdata).then(() => {
              this.modiActivePath("");
              this.getAllCarSeries();
              this.getCarSeriesVehicleInfo({ page: 1, size: 9999 });
            });
          } else {
            this.addCarSeriesOrVehicle(formdata).then(() => {
              this.modiActivePath("");
              this.getAllCarSeries();
              this.getCarSeriesVehicleInfo({ page: 1, size: 9999 });
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