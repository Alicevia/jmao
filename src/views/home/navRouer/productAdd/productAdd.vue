<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000,y:550}"
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
          title="删除该产品，会使该产品下的所有信息被删除"
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
  },
  created() {
    this.getProductInfo();
  },
  mounted() {},

  methods: {
    ...mapActions(["getProductInfo",'modiActivePath','deleteProductInfo']),
    // 删除产品信息
    onDelete(item) {
      this.deleteProductInfo({id:item.id})
      console.log(item)
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
/deep/ .ant-table-thead th
  background-color rgba(33,98,185,.08)
  color #555
.car-add
  width 100%
  height 100%
  overflow hidden
</style>