<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000}"
      size="middle"
      rowKey="id"
      childrenColumnName="vehicleResponseList"
      :bordered="true"
      :pagination="{
      defaultPageSize:10,
      size:'middle',
      position:'bottom'
    }"
      :dataSource="showCarSeriesVehicle"
    >
      <img class="pic" slot="seriesPic" slot-scope="item" :src="item" alt />

      <a slot="action" slot-scope="item" href="javascript:;">
        <a-button type="link" size="small">修改</a-button>&nbsp;
        <a-button type="danger" size="small">删除</a-button>
      </a>
    </a-table>
    <AddCarSeriesDialog></AddCarSeriesDialog>
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
    width: "20%"
  },
  {
    title: "车型",
    dataIndex: "vehicleName",
    key: "vehicleName",
    width: "20%"
  },
  {
    title: "车系图片",
    dataIndex: "seriesPic",
    key: "seriesPic",
    width: "20%",
    scopedSlots: { customRender: "seriesPic" }
  },
  {
    title: "车型图片",
    dataIndex: "vehiclePic",
    key: "vehiclePic",
    width: "20%",
    scopedSlots: { customRender: "vehiclePic" }
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    align: "center",
    width: "20%",
    dataIndex: "action",
    key: "action"
  }
];

export default {
  data() {
    return {
      columns
    };
  },

  computed: {
    ...mapGetters(["showCarSeriesVehicle"]),
    ...mapState(["allSeriesVhicleInfo", "currentCarSeriesPage"]),
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
    ...mapActions(["getCarSeriesVehicleInfo", "updateCarSeriesVehicleInfo"]),
    changePage(page) {
      let { allSeriesVhicleInfo, currentCarSeriesPage } = this;
      if (!allSeriesVhicleInfo[currentCarSeriesPage]) {
        this.getCarSeriesVehicleInfo({ page, size: 10 });
      } else {
        this.updateCarSeriesVehicleInfo(page);
      }

      console.log(page);
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
  .pic
    width 40px
    height 40px
</style>