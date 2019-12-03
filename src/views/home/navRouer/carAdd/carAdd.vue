<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000}"
      size="middle"
      rowKey="id"
      :childrenColumnName="'vehicleResponseList'"
      :bordered="true"
      :pagination="{
      defaultPageSize:10,
      size:'middle',
      position:'bottom'
    }"
      :dataSource="showCarSeriesVehicle"
    >
      <img :style="pic" slot="seriesPic" slot-scope="item" :src="item" alt />
      <img :style="pic" slot="vehiclePic" slot-scope="item" :src="item" alt />
      <template slot="action" slot-scope="text,record">
        <a-button type="link" size="small" @click="changeCar(record)">修改</a-button>&nbsp;
        <a-button type="danger" size="small" @click="deleteCar(record)">删除</a-button>
      </template>
    </a-table>
    <AddCarSeriesDialog :showDataToChild="showDataToChild"></AddCarSeriesDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AddCarSeriesDialog from "./addCarSeriesDialog";
const columns = [
  {
    title: "车系",
    dataIndex: "seriesName",
    key: "seriesName",
    width: "20%",
    align: "center"
  },
  {
    title: "车型",
    dataIndex: "vehicleName",
    key: "vehicleName",
    width: "20%",
    align: "center"
  },
  {
    title: "车系图片",
    dataIndex: "seriesPic",
    key: "seriesPic",
    width: "20%",
    scopedSlots: { customRender: "seriesPic" },
    align: "center"
  },
  {
    title: "车型图片",
    dataIndex: "vehiclePic",
    key: "vehiclePic",
    width: "20%",
    scopedSlots: { customRender: "vehiclePic" },
    align: "center"
  },
  {
    title: "操作",
    align: "center",
    width: "20%",
    dataIndex: "action",
    key: "action",
    scopedSlots: { customRender: "action" },

  }
];

export default {
  data() {
    return {
      showDataToChild: {},
      columns,
      pic: {
        display: "inline-block",
        height: "60px"
      }
    };
  },

  computed: {
    ...mapGetters(["showCarSeriesVehicle"]),
    ...mapState(["allSeriesVhicleInfo", "currentCarSeriesPage"]),
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
    // },
    pagination: {
      get() {
        return {
          defaultPageSize: 1,
          size: "middle",
          position: "top",
          // showSizeChanger:true,
          total: this.allAttributeInfo.total || 0,
          onChange: this.changePage
        };
      }
    }
  },
  created() {},
  mounted() {
    this.getCarSeriesVehicleInfo({ page: 1, size: 10 });
  },

  methods: {
    ...mapActions(["getCarSeriesVehicleInfo", "updateCarSeriesVehicleInfo",'modiActivePath']),
    changePage(page) {
      let { allSeriesVhicleInfo, currentCarSeriesPage } = this;
      if (!allSeriesVhicleInfo[currentCarSeriesPage]) {
        this.getCarSeriesVehicleInfo({ page, size: 10 });
      } else {
        this.updateCarSeriesVehicleInfo(page);
      }

      console.log(page);
    },
    // 修改车型车系
    changeCar(item) {
      console.log(item)
      this.showDataToChild = item;
      this.modiActivePath(this.$route.path);
    },
    // 删除车型车系
    deleteCar(item){
      console.log(item)
    }
  },

  components: { AddCarSeriesDialog }
};
</script>
<style lang='stylus' scoped>
.car-add
  width 100%
  height 100%
  overflow hidden
  /deep/ .pic
    display inline-block
    width 40px
    height 40px
</style>