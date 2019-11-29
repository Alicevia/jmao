<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000}"
      :bordered="true"
      rowKey='id'
      :pagination="{
          defaultPageSize:10,
          size:'middle',
          position:'bottom'
        }"
      :dataSource="data"
    >
      <a slot="action" slot-scope="item" href="javascript:;">
        <a-button type="link"  size='small'>修改</a-button>&nbsp;
        <a-button type="danger" size='small'>删除</a-button>
      </a>
    </a-table>

  </div>
</template>

<script>
  const columns = [
    {width:100,title: '产品名称',  dataIndex: 'productName', key: 'productName', align: 'center'},
    {width:100, title: '图片',  dataIndex: 'productPic', key: 'productPic',align: 'center'},
      {width:100, title: '备注',  dataIndex: 'remarks', key: 'remarks',align: 'center'},
    {width:150,
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(  {
        "operation":i,
        "automobileInformationId": i,
        "beginningYear": i,
        "cylinderNumber":i,
        "displacement":i,
        "endYear":i,
        "gearPosition": i,
        "id": i,
        "jiMaoNumber": i,
        "oenumber": i,
        "pistil": i,
        "pistilSize": i,
        "productId": i,
        "productName": i,
        "seriesName": i,
        "tankMaterial": i,
        "vehicleName":i,
        "waterChamberSize": i,
        "waveformHeight": i
      });
  }
export default {
  data() {
    return {
      data,
      columns
    };
  },

  computed: {
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
    }
  },

  mounted() {},

  methods: {},

  components: {}
};
</script>
<style lang='stylus' scoped>
.car-add
  width 100%
  height 100%
  overflow hidden
</style>