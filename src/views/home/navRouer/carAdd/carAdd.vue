<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000}"
      rowKey="id"
      :childrenColumnName="'vehicleResponseList'"
      :bordered="true"
      :pagination="pagination"
      :dataSource="showCarSeriesVehicle"
    >
      <img :style="pic" slot="seriesPic" slot-scope="item" :src="item" alt />
      <img :style="pic" slot="vehiclePic" slot-scope="item" :src="item" alt />
      <template slot="action" slot-scope="text,record">
        <a-button type="link" size="small" @click="changeCar(record)">修改</a-button>&nbsp;
        <a-popconfirm
          v-if="showCarSeriesVehicle.length"
          :title="deleteTitle(record)"
          @confirm="() => onDelete(record)"
        >
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <AddCarSeriesDialog
      @clearCarInfoToChild="clearCarInfoToChild"
      :showDataToChild="showDataToChild"
    ></AddCarSeriesDialog>
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
    scopedSlots: { customRender: "action" }
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
    // 车系车型标题切换
    deleteTitle(item) {
      return item => {
        if (item.seriesName) {
          return "车系被删除，其下车型会被全部删除";
        } else {
          return "确定要删除该车型吗";
        }
      };
    },
    pagination: {
      get() {
        return {
          defaultPageSize: 10,
          size: "middle",
          position: "bottom",
          // showSizeChanger:true,
          total: this.allSeriesVhicleInfo.total || 0,
          onChange: this.changePage
        };
      }
    }
  },
  created() {},
  mounted() {
    this.getCarSeriesVehicleInfo({ page: 1, size: 9999 });
  },

  methods: {
    ...mapActions([
      "getCarSeriesVehicleInfo",
      "updateCarSeriesVehicleInfo",
      "deleteCarSeriesOrVehicle",
      "modiActivePath",
      "getAllCarSeries"
    ]),
    // 改变页码
    changePage(page) {
      let { allSeriesVhicleInfo, currentCarSeriesPage } = this;
      this.updateCarSeriesVehicleInfo(page);
 
  
    },
    // 修改车型车系
    changeCar(item) {
      console.log(item);
      this.showDataToChild = item;
      this.modiActivePath(this.$route.path);
    },
    // 情况传递的数据
    clearCarInfoToChild() {
      this.showDataToChild = {};
    },
    // 确定删除
    onDelete(item) {
      console.log(item.id);
      this.deleteCarSeriesOrVehicle(item.id).then(() => {
        this.getCarSeriesVehicleInfo({ page: 1, size: 9999 });
      });
    }
    // 删除车型车系
    // deleteCar(item) {
    //   // this.deleteTitle(item);
    //   // console.log(item);
    // }
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