<template>
    <a-table  :columns="columns" 
    :scroll="{x:1000,y:570}" :size='"middle"'
    :bordered='true'
    :pagination="{
      defaultPageSize:20,
      size:'middle',
      position:'bottom'
    }"
    :dataSource="data" >
      <a slot="action" slot-scope="item" href="javascript:;">action</a>
    </a-table>
</template>

<script>
  const columns = [
    { title: '车系',  dataIndex: 'vehicleName', key: 'vehicleName', align: 'center'},
    { title: '车型',  dataIndex: 'vehicleName', key: 'vehicleName',align: 'center'},
    { title: 'OE号',  dataIndex: 'oenumber', key: 'oenumber',align: 'center'},
    { title: '吉茂品号',  dataIndex: 'jiMaoNumber', key: 'jiMaoNumber',align: 'center'},
    { title: '汽车年份(起)',  dataIndex: 'beginningYear', key: 'beginningYear',align: 'center'},
    { title: '汽车年份(止)',  dataIndex: 'endYear', key: 'endYear',align: 'center'},
    { title: '排量',  dataIndex: 'displacement', key: 'displacement',align: 'center'},
    { title: '气缸数',  dataIndex: 'cylinderNumber', key: 'cylinderNumber',align: 'center'},
    { title: '自动/手动',  dataIndex: 'gearPosition', key: 'gearPosition',align: 'center'},
    { title: '水箱材质',  dataIndex: 'tankMaterial', key: 'tankMaterial',align: 'center'},
    { title: '蕊体尺寸',  dataIndex: 'pistilSize', key: 'pistilSize',align: 'center'},
    { title: '蕊厚',  dataIndex: 'pistil', key: 'pistil',align: 'center'},
    { title: '波高',  dataIndex: 'waveformHeight', key: 'waveformHeight',align: 'center'},
    {
      title: 'Action',
      key: 'operation',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
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

  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.car-add
  width 100%
  height 100%
  overflow hidden

</style>