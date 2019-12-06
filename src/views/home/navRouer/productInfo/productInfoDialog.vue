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
      :bodyStyle="{height:'500px'}"
    >
      <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form">
          <a-row :gutter="24">
            <a-col
              v-for="(item,index) in formItem"
              :key="index"
              style="height:60px"
              :span="8"
              :style="{ display:item[0]!=='id'?'block':'none'}"
            >
              <a-form-item
                :label="item[1]"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                v-if="item[0]==='id'? showDataToChild.id:true"
              >
                <template v-if="item[0]==='automobileInformationId'">
                  <a-cascader
                    v-decorator="['automobileInformationId',{rules: [
                  {required: true,message: '请选择车型车系',}],
                     initialValue:showDataToChild.automobileInformationId
                     }]"
                    :options="cascaderData"
                    @change="onChange"
                    :fieldNames="{ label: 'seriesName', value: 'id', children: 'vehicleResponseList' }"
                    placeholder="请选择车型车系"
                  />
                </template>
                <template v-else-if="item[0]==='productId'">
                  <a-select
                    v-decorator="['productId',{rules: [
                      {required: true,message: '请选择产品'}],
                    initialValue:showDataToChild[item[0]]
                    }]"
                    style="width: 178px"
                    @change="handleChange"
                    placeholder="请选择产品"
                  >
                    <a-select-option v-for="item in productInfo" :key="item.id">{{item.productName}}</a-select-option>
                  </a-select>
                </template>
                <template v-else-if="item[0]==='gearPosition'">
                  <a-select
                    v-decorator="['gearPosition',{rules: [
                      {required: true,message: '请选择手自动挡'}],
                    initialValue:showDataToChild[item[0]]
                    }]"
                    size="default"
                    style="width: 178px"
                    placeholder="请选择手自动挡"
                  >
                    <a-select-option v-for="i in [0,1,2]" :key="i" :value="i">{{automatic(i)}}</a-select-option>
                  </a-select>
                </template>
                <template v-else-if="item[0]==='beginningYear'||item[0]==='endYear'">
                  <a-input
                    v-decorator="[item[0],{
                      rules: [
                      {required: true, message:`请输入${item[1]}`},
                      { pattern:new RegExp('^[0-9]{4}$','g'),message:'请输入4位数字的年份'}
                      ],
                  initialValue:showDataToChild[item[0]]
                  }]"
                    :placeholder="`请输入${item[1]}`"
                  />
                </template>
                <template v-else-if="item[0]==='file'">
                  <PicUpload
                    @getUploadImg="getUploadImg"
                    v-decorator="['file',
                  { 
                    rules: [{ required: false,message: '请上传图片' }], 
                    initialValue:showDataToChild.attributePic
                    }]"
                    :picture="pictureToChild"
                  ></PicUpload>
                </template>
                  <a-input
                    v-else
                    v-decorator="[item[0],{rules: [
                        {required: false,message: `请输入${item[1]}`,}],
                        initialValue: showDataToChild[item[0]]
                      }]"
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
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake"
                }
              ]
            }
          ]
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men"
                }
              ]
            }
          ]
        }
      ]
    };
  },

  computed: {
    ...mapState(["activePath", "productInfo", "allSeriesVhicleInfo",'currentAttributeInfoPage']),
    visible: {
      get() {
        return "/home/productinfo" === this.activePath ? true : false;
      }
    },
    // 手自动
    automatic(i) {
      return i => {
        switch (i) {
          case 0:
            return "自动挡";
            break;
          case 1:
            return "手动挡";
            break;
          default:
            return "手自动一体";
            break;
        }
      };
    },
    formItem() {
      let formItem = {
        automobileInformationId: "车系名称",
        productId: "产品名称",
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
        waveformHeight: "波高",
        file: "产品详图"
      };
      formItem = Object.entries(formItem);
      return formItem;
    },
    cascaderData() {
      let allSeriesVhicleInfo = this.allSeriesVhicleInfo[1] || [];
      allSeriesVhicleInfo = allSeriesVhicleInfo
        .map(item => {
          if (item.vehicleResponseList) {
            item.vehicleResponseList.forEach(value => {
              value.seriesName = value.vehicleName;
            });
          }
          return item;
        })
        .filter(item => {
          return item.vehicleResponseList;
        });
      return allSeriesVhicleInfo;
    },

    // 给upload的图片属性
    pictureToChild() {
      return this.showDataToChild.attributePic;
    }
  },
  created() {
    this.getCarSeriesVehicleInfo({ page: 1, size: 9999 });
    this.getProductInfo();

  },
  mounted() {},
  activated(){
    this.getCarSeriesVehicleInfo({ page: 1, size: 9999 });
    this.getProductInfo();
  },

  methods: {
    ...mapActions([
      "modiActivePath",
      "getProductInfo",
      "addProductAttributeInfo",
      "getCarSeriesVehicleInfo",
      "modiProductAttributeInfo",
      'getProductAttributeInfo'
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
      this.$emit("clearProductInfoToChild");
    },
    // 车系车系选择回调
    onChange(value) {
      // console.log(value);
    },
    // 产品选择回调
    handleChange(value) {
      // console.log(`Selected: ${value}`);
    },

    // 弹窗的确定按钮
    handleOk(e) {
      e.preventDefault();
      if (this.img) {
        this.form.setFieldsValue({ file: this.img });
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          values.automobileInformationId = values.automobileInformationId[1];
          let formdata = new FormData();
          for (const key in values) {
            if (!values.hasOwnProperty(key)) return;
            if ((key === "file" && !values["file"])||values[key]===undefined) {
              continue;
            }
            formdata.append([key], values[key]);
          }
          console.log(values);
          if (this.showDataToChild.id) {
            this.modiProductAttributeInfo(formdata).then(()=>{
              this.getProductAttributeInfo({page:this.currentAttributeInfoPage,size:10})
            });
            this.modiActivePath("");
          } else {
            this.addProductAttributeInfo(formdata);
            this.modiActivePath("");
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
  padding-bottom 80px
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