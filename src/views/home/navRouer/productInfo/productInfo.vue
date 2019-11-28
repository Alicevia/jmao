<template>
 <div class="product-info">
   <div class="search">
    <a-input-search
     placeholder="请输入车型或者车系"
     style="width: 300px"
      @search="onSearch" size="default">
      <a-button slot="enterButton">搜索</a-button>
    </a-input-search>
   </div>
    <a-table :rowSelection="rowSelection" :columns="columns" 
    :scroll="{x:'120%',y:570}" :size='"middle"' rowKey='id'
    :pagination='{
      defaultPageSize:20,
      size:"middle",
      position:"top"
    }'
    :dataSource="data" >
      <a slot="action" slot-scope="item" href="javascript:;">action</a>
    </a-table>
</div>
</template>

<script>
  const columns = [
    {width:'5%',fixed:'left', title: '车系',  dataIndex: 'seriesName', key: 'seriesName', align: 'center'},
    {width:'5%',fixed:'left', title: '车型',  dataIndex: 'vehicleName', key: 'vehicleName',align: 'center'},
    {width:'5%',fixed:'left', title: 'OE号',  dataIndex: 'oenumber', key: 'oenumber',align: 'center'},
    {width:'5%',fixed:'left', title: '吉茂品号',  dataIndex: 'jiMaoNumber', key: 'jiMaoNumber',align: 'center'},
    {width:'5%',fixed:'left', title: '汽车年份(起)',  dataIndex: 'beginningYear', key: 'beginningYear',align: 'center'},
    {width:'5%',fixed:'left', title: '汽车年份(止)',  dataIndex: 'endYear', key: 'endYear',align: 'center'},
    {width:'5%',fixed:'left', title: '排量',  dataIndex: 'displacement', key: 'displacement',align: 'center'},
    {width:'5%',fixed:'left', title: '气缸数',  dataIndex: 'cylinderNumber', key: 'cylinderNumber',align: 'center'},
    {width:'5%',fixed:'left', title: '自动/手动',  dataIndex: 'gearPosition', key: 'gearPosition',align: 'center'},
    {width:'5%',fixed:'left', title: '水箱材质',  dataIndex: 'tankMaterial', key: 'tankMaterial',align: 'center'},
    {width:'5%',fixed:'left', title: '蕊体尺寸',  dataIndex: 'pistilSize', key: 'pistilSize',align: 'center'},
    {width:'5%',fixed:'left', title: '蕊厚',  dataIndex: 'pistil', key: 'pistil',align: 'center'},
    {width:'5%',fixed:'left', title: '波高',  dataIndex: 'waveformHeight', key: 'waveformHeight',align: 'center'},
    {width:'5%',fixed:'left',
      title: 'Action',
      key: 'operation',
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
        columns,
    };
  },

  computed: {
    rowSelection() {
        const { selectedRowKeys } = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            },
          }),
        };
      },
  },

  mounted() {

  },

  methods: {
       onSearch(value) {
        console.log(value);
      },
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