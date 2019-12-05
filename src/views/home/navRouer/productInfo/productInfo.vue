<template>
  <div class="product-info">
    <div class="search">
      <a-input-search
        placeholder="请输入车型或者车系"
        style="width: 300px"
        @search="onSearch"
        size="default"
      >
        <a-button slot="enterButton">搜索</a-button>
      </a-input-search>
    </div>
    <a-table
      :rowSelection="rowSelection"
      :columns="columns"
      :scroll="{x:2060}"
      rowKey="id"
      :pagination="pagination"
      :dataSource="showProductAttribute"
    >
      <template slot="action" slot-scope="item">
        <a-button type="link" size="small" @click="changeAttribute(item)">修改</a-button>&nbsp;
        <a-button type="danger" size="small" @click="deleteAttribute(item)">删除</a-button>
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
const columns = [
  {
    width: 100,
    fixed: "left",
    title: "车系",
    dataIndex: "seriesName",
    key: "seriesName",
    align: "center"
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
    width: 100,
    fixed: "left",
    title: "产品名",
    dataIndex: "productName",
    key: "productName",
    align: "center"
  },
  {
    width: 100,
    title: "产品详图",
    dataIndex: "attributePic",
    key: "attributePic",
    align: "center",
    scopedSlots: { customRender: "attributePic" }
  },
  {
    width: 100,
    // fixed: "left",
    title: "适用车型",
    dataIndex: "applicableVehicleType",
    key: "applicableVehicleType",
    align: "center"
  },
  {
    width: 100,
    title: "OE号",
    dataIndex: "oenumber",
    key: "oenumber",
    align: "center"
  },
  {
    width: 120,
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
    align: "center"
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
    width: 100,
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
      "allSeriesVhicleInfo"
    ]),
    ...mapGetters(["showProductAttribute"]),
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
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
    }
  },

  mounted() {
    this.getProductAttributeInfo({ page: 1, size: 10 });
  },

  methods: {
    ...mapActions([
      'modiActivePath',
      "getProductAttributeInfo",
      "updateCurrentAttributeInfoPage",
      "deleteProductAttributeInfo"
    ]),
    // 删除某些属性
    deleteAttribute(item) {
      // console.log(item.id)
      // body 不需要字段
      this.deleteProductAttributeInfo([item.id]).then(() => {
        this.getProductAttributeInfo({
          page: this.currentAttributeInfoPage,
          size: 10
        });
      });
    },
    // 修改某条属性
    changeAttribute(item) {
      console.log(item);
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
      this.modiActivePath(this.$route.path)
      console.log(item);
    },
    // 改变页码的回调
    changePage(page) {
      let { allAttributeInfo } = this;
      if (!allAttributeInfo[page]) {
        this.getProductAttributeInfo({ page, size: 10 });
      } else {
        this.updateCurrentAttributeInfoPage(page);
      }
    },
    // 清空传递的信息
    clearProductInfoToChild() {
      this.showDataToChild = {};
    },
    onSearch(value) {
      console.log(value);
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
  /deep/ .ant-table-pagination.ant-pagination
    margin-right 20px
  .search
    position absolute
    top 16px
    left 22px
    z-index 999
</style>