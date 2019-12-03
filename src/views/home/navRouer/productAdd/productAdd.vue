<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000}"
      :bordered="true"
      rowKey="id"
      :pagination="pagination"
      :dataSource="productInfo"
    >
      <img :style="pic" slot="productPic" slot-scope="item" :src="item" alt />

      <template slot="action" slot-scope="item">
        <a-button type="link" size="small" @click="changeProductInfo(item)">修改</a-button>&nbsp;
        <a-popconfirm
          v-if="productInfo.length"
          title="Sure to delete?"
          @confirm="() => onDelete(item)"
        >
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <ProductAddDialog 
    @clearProductToChild='clearProductToChild'
    :showDataToChild='showDataToChild'>
    </ProductAddDialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ProductAddDialog from "./productAddDialog";
const columns = [
  {
    width: "25%",
    title: "产品名称",
    dataIndex: "productName",
    key: "productName",
    align: "center"
  },
  {
    width: "25%",
    title: "图片",
    dataIndex: "productPic",
    key: "productPic",
    align: "center",
    scopedSlots: { customRender: "productPic" }
  },
  {
    width: "25%",
    title: "备注",
    dataIndex: "remarks",
    key: "remarks",
    align: "center"
  },
  {
    width: "25%",
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

export default {
  data() {
    return {
      showDataToChild:{},
      columns,
      pic: {
        display: "inline-block",
        height: "60px"
      },
      productPage: 0
    };
  },

  computed: {
    ...mapGetters(["showProductList"]),
    ...mapState(["productInfo"]),
    // 分页配置
    pagination: {
      get() {
        return {
          defaultPageSize: 10,
          size: "middle",
          position: "bottom",
          total: this.productInfo.length
        };
      }
    }
    // rowSelection() {
    //   const { selectedRowKeys } = this;
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       console.log(
    //         `selectedRowKeys: ${selectedRowKeys}`,
    //         "selectedRows: ",
    //         selectedRows
    //       );
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === "Disabled User", // Column configuration not to be checked
    //         name: record.name
    //       }
    //     })
    //   };
    // }
  },
  created() {
    this.getProductInfo();
  },
  mounted() {},

  methods: {
    ...mapActions(["getProductInfo",'modiActivePath']),
    // 删除产品信息
    onDelete(item) {

      // this.dataSource = dataSource.filter(item => item.key !== key);
    },
    // 修改产品信息
    changeProductInfo(item) {
      this.showDataToChild = item
      this.modiActivePath(this.$route.path)
    },
    // 清除传递的数据
    clearProductToChild(){
      this.showDataToChild={}
    }
  },

  components: { ProductAddDialog }
};
</script>
<style lang='stylus' scoped>
.car-add
  width 100%
  height 100%
  overflow hidden
</style>