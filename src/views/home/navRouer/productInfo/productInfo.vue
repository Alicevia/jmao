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
      :scroll="{x:1880}"
      rowKey="id"
      :pagination="pagination"
      :dataSource="showProductAttribute"
    >
      <template slot="action" slot-scope="item">
        <a-button type="link" size="small">修改</a-button>&nbsp;
        <a-button type="danger" size="small">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { reqAllAttributeData } from "@/api";
import { mapActions, mapState, mapGetters } from "vuex";
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

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    operation: i,
    automobileInformationId: i,
    beginningYear: i,
    cylinderNumber: i,
    displacement: i,
    endYear: i,
    gearPosition: i,
    id: i,
    jiMaoNumber: i,
    oenumber: i,
    pistil: i,
    pistilSize: i,
    productId: i,
    productName: i,
    seriesName: i,
    tankMaterial: i,
    vehicleName: i,
    waterChamberSize: i,
    waveformHeight: i
  });
}
export default {
  data() {
    return {
      columns
    };
  },

  computed: {
    ...mapState(["allAttributeInfo", "currentAttributeInfoPage"]),
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
    pagination:{
      get() {
        return {
          defaultPageSize: 1,
          size: "middle",
          position: "top",
          // showSizeChanger:true,
          total: this.allAttributeInfo.total || 1,
          onChange:this.changePage
        };
      }
    }
  },

  mounted() {
    this.getProductAttributeInfo({ page: 1, size: 10 });
  },

  methods: {
    ...mapActions(["getProductAttributeInfo",'updateCurrentAttributeInfoPage']),
    // 改变页码的回调
    changePage(page){
      let {allAttributeInfo} = this
      if(!allAttributeInfo[page]){
        this.getProductAttributeInfo({page,size:1})
      }else{
        this.updateCurrentAttributeInfoPage(page)
      }

      console.log(page)
    },
    onSearch(value) {
      console.log(value);
    }
  },

  components: {}
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