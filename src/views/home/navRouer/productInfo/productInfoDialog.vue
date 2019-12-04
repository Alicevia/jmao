<template>
  <div>
    <a-modal
      :title="showDataToChild.id?'产品属性修改':'产品属性添加'"
      :visible="visible"
      @ok="handleOk"
      :width="1000"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :maskClosable="false"
      :keyboard="false"
      :afterClose="closeCallBack"
      :destroyOnClose="true"
    >
      <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form">
          <a-row :gutter="24">
            <a-col
              v-for="(item,index) in formItem"
              :key="index"
              :span="8"
              :style="{ display:item[0]!=='id'?'block':'none'}"
            >
            
              <a-form-item
                :label="item[1]"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                v-if="!(showDataToChild.id&&item[0]==='id')"
              >
              <template v-if="item[0]==='automobileInformationId'">
                 <a-cascader :options="options" @change="onChange" placeholder="Please select" />
              </template>
              <template v-else-if="item[0]==='productId'">
                 <a-cascader :options="options" @change="onChange" placeholder="Please select" />

              </template>
               
              <a-input v-else  v-decorator="[item[0],{rules: [
                  {required: true,message: '请输入相关信息',}],
                initialValue:''}]"
                :placeholder="`请输入${item[1]}`"
              />

              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
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
      form: this.$form.createForm(this, { name: "productAttribute" }),
      img: "",
      seriesOrVehicle: "添加车系",
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 15 }
      },
       options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
    };
  },

  computed: {
    ...mapState(["activePath", "allCarSeries", "currentCarSeriesPage"]),
    visible: {
      get() {
        return "/home/productinfo" === this.activePath ? true : false;
      }
    },
    formItem() {
      let formItem = {
        automobileInformationId: "车型车系ID",
        productId: "产品ID",

        applicableVehicleType: "适用车型",

        beginningYear: "起始年份",
        cylinderNumber: "气缸数",
        displacement: "排量",
        endYear: "截止年份",
        gearPosition: "档位", //档位
        id: 0,
        jiMaoNumber: "吉茂号",
        oenumber: "OE号",
        pistil: "蕊厚",
        pistilSize: "蕊体尺寸",
        tankMaterial: "水箱材质",
        waterChamberSize: "水室尺寸",
        waveformHeight: "波高"
      };
      formItem = Object.entries(formItem);
      console.log(formItem);
      return formItem;
    },
    // 给upload的图片属性
    pictureToChild() {
      return this.showDataToChild.seriesPic || this.showDataToChild.vehiclePic;
    }
  },
  created() {
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
      console.log("--");
      this.form.resetFields();
      this.$emit("clearCarInfoToChild");
    },

     onChange(value) {
        console.log(value);
      },

    // 弹窗的确定按钮
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
            if (key === "file" && !values["file"]) {
              continue;
            }
            formdata.append([key], values[key]);
          }
          if (this.showDataToChild.id) {
            formdata.append("id", this.showDataToChild.id);
            console.log(values, formdata);
            this.modiCarSeriesOrVehicle(formdata).then(() => {
              this.modiActivePath("");
              this.getCarSeriesVehicleInfo({
                page: this.currentCarSeriesPage,
                size: 10
              });
            });
          } else {
            this.addCarSeriesOrVehicle(formdata).then(() => {
              this.modiActivePath("");
              this.getAllCarSeries();
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
<style lang='stylus' scoped>
.ant-advanced-search-form
  padding 24px
  background #fbfbfb
  border 1px solid #d9d9d9
  border-radius 6px
.ant-advanced-search-form .ant-form-item
  display flex
.ant-advanced-search-form .ant-form-item-control-wrapper
  flex 1
#components-form-demo-advanced-search .ant-form
  max-width none
#components-form-demo-advanced-search .search-result-list
  margin-top 16px
  border 1px dashed #e9e9e9
  border-radius 6px
  background-color #fafafa
  min-height 200px
  text-align center
  padding-top 80px
</style>