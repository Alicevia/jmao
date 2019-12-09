<template>
  <div class="product-info">
    <div class="search">
      <a-input-search
        placeholder="请输入车型或者车系"
        style="width: 300px"
        @search="onSearch"
        size="default"
        @change="inputValue"
      >
        <a-button slot="enterButton">搜索</a-button>
      </a-input-search>
    </div>
    <a-table
      :style="{ wordBreak: 'break-all' }"
      :rowSelection="rowSelection"
      :columns="columns"
      :scroll="{x:2500,y:550}"
      rowKey="id"
      :bordered="true"
      :pagination="pagination"
      :customHeaderRow='tableHeader'
      :dataSource="showProductAttribute"
    >
      <template slot="action" slot-scope="item">
        <a-button type="link" size="small" @click="changeAttribute(item)">修改</a-button>&nbsp;
        <a-button type="danger" size="small" @click="deleteAttribute(item)">删除</a-button>
      </template>
      <template slot="gearPosition" slot-scope="item">
        <span>{{automatic(item)}}</span>
      </template>
      <img :style="pic" slot="attributePic" slot-scope="item" :src="item" alt />
    </a-table>
    <ProductInfoDialog
      @clearProductInfoToChild="clearProductInfoToChild"
      :showDataToChild="showDataToChild"
    ></ProductInfoDialog>
  </div>
</template>

<script>
import { reqAllAttributeData } from "@/api";
import { mapActions, mapState, mapGetters } from "vuex";
import ProductInfoDialog from "./productInfoDialog";
import bus from "@/utils/bus";
import { message } from "ant-design-vue";
const columns = [
  {
    width: 100,
    fixed: "left",
    title: "车系",
    dataIndex: "seriesName",
    key: "seriesName",
    align: "center",
  },
  {
    width: 100,
    fixed: "left",
    title: "车型",
    dataIndex: "vehicleName",
    key: "vehicleName",
    align: "center"
  },
  {
    width: 150,
    fixed: "left",
    title: "产品名",
    dataIndex: "productName",
    key: "productName",
    align: "center"
  },
  {
    width: 120,
    title: "产品详图",
    dataIndex: "attributePic",
    key: "attributePic",
    align: "center",
    scopedSlots: { customRender: "attributePic" }
  },
  {
    width: 250,
    title: "适用车型",
    dataIndex: "applicableVehicleType",
    key: "applicableVehicleType",
    align: "center"
  },
  {
    width: 300,
    title: "OE号",
    dataIndex: "oenumber",
    key: "oenumber",
    align: "center"
  },
  {
    width: 100,
    title: "吉茂品号",
    dataIndex: "jiMaoNumber",
    key: "jiMaoNumber",
    align: "center"
  },
  {
    width: 150,
    title: "汽车年份(起)",
    dataIndex: "beginningYear",
    key: "beginningYear",
    align: "center"
  },
  {
    width: 150,
    title: "汽车年份(止)",
    dataIndex: "endYear",
    key: "endYear",
    align: "center"
  },
  {
    width: 100,
    title: "排量",
    dataIndex: "displacement",
    key: "displacement",
    align: "center"
  },
  {
    width: 100,
    title: "气缸数",
    dataIndex: "cylinderNumber",
    key: "cylinderNumber",
    align: "center"
  },
  {
    width: 120,
    title: "自动/手动",
    dataIndex: "gearPosition",
    key: "gearPosition",
    align: "center",
    scopedSlots: { customRender: "gearPosition" }
  },
  {
    width: 100,
    title: "水箱材质",
    dataIndex: "tankMaterial",
    key: "tankMaterial",
    align: "center"
  },
  {
    width: 100,
    title: "水室尺寸",
    dataIndex: "waterChamberSize",
    key: "waterChamberSize",
    align: "center"
  },
  {
    width: 200,
    title: "蕊体尺寸",
    dataIndex: "pistilSize",
    key: "pistilSize",
    align: "center"
  },
  {
    width: 100,
    title: "蕊厚",
    dataIndex: "pistil",
    key: "pistil",
    align: "center"
  },
  {
    width: 100,
    title: "波高",
    dataIndex: "waveformHeight",
    key: "waveformHeight",
    align: "center"
  },
  {
    width: 150,
    fixed: "right",
    title: "Action",
    key: "operation",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
export default {
  data() {
    return {
      showDataToChild: {},
      columns,
      pic: {
        display: "inline-block",
        height: "50px"
      }
    };
  },

  computed: {
    ...mapState([
      "allAttributeInfo",
      "currentAttributeInfoPage",
      "allSeriesVhicleInfo",
      "search"
    ]),
    ...mapGetters(["showProductAttribute"]),
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          bus.$emit("transportDeleteAry", selectedRowKeys);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    },
    pagination: {
      get() {
        return {
          defaultPageSize: 10,
          size: "middle",
          position: "top",
          // showSizeChanger:true,
          total: this.allAttributeInfo.total || 1,
          onChange: this.changePage
        };
      }
    },
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
    }
  },
  created(){
    this.getProductAttributeInfo({ page: 1, size: 10 });
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      "modiActivePath",
      "getProductAttributeInfo",
      "updateCurrentAttributeInfoPage",
      "deleteProductAttributeInfo",
      "searchAttribute",
      "searchFlag"
    ]),
    tableHeader(item){
        item.forEach(values=>{
          values.className+=' th-bg'
        })
    },
    // 删除某些属性
    deleteAttribute(item) {
      // body 不需要字段
      this.deleteProductAttributeInfo([item.id]).then(() => {
        if (this.search) {
          this.getProductAttributeInfo({
            page: this.currentAttributeInfoPage,
            size: 10,
            keywords: this.search
          });
        } else {
          this.getProductAttributeInfo({
            page: this.currentAttributeInfoPage,
            size: 10
          });
        }
      });
    },
    // 修改某条属性
    changeAttribute(item) {
      let automobileInformationId = [];
      let allSeriesVhicleInfo = this.allSeriesVhicleInfo[1] || [];
      let allVhicleInfo = [];
      allSeriesVhicleInfo.forEach(value => {
        if (value.vehicleResponseList) {
          allVhicleInfo = allVhicleInfo.concat(value.vehicleResponseList);
        }
      });
      allVhicleInfo.forEach(values => {
        if (values.id === item.automobileInformationId) {
          automobileInformationId.push(values.parentId, values.id);
        }
      });
      item.automobileInformationId = automobileInformationId;
      this.showDataToChild = item;
      // console.log(this.showDataToChild)
      this.modiActivePath(this.$route.path);
    },
    // 改变页码的回调
    changePage(page) {
      console.log(page)
      let { allAttributeInfo } = this;
      if (!allAttributeInfo[page]) {
        if (this.search) {
          this.searchAttribute({ page, size: 10, keywords: this.search });
          return;
        }
        this.getProductAttributeInfo({ page, size: 10 });
      } else {
        console.log('==')
        this.updateCurrentAttributeInfoPage(page);
      }
    },
    // 清空传递的信息
    clearProductInfoToChild() {
      this.showDataToChild = {};
      console.log(this.showDataToChild);
    },
    inputValue(e) {
      this.searchFlag(e.target.value.trim());
      if (this.search === "") {
        this.getProductAttributeInfo({ page: 1, size: 10 });
      }
    },
    onSearch() {
      if (this.search === "") {
        message.warning("请输入搜索信息");
        return;
      }
      this.searchAttribute({ page: 1, size: 10, keywords: this.search });
    }
  },

  components: { ProductInfoDialog }
};
</script>
<style lang='stylus' scoped>

.product-info
  position relative
  width 100%
  height 100%
  background-color #fff
  /deep/ .ant-table-thead th
    background-color rgba(33,98,185,.08)
    color #555
  /deep/ .ant-table-pagination.ant-pagination
    margin-right 20px
 
  .search
    position absolute
    top 16px
    left 22px
    z-index 999
</style>