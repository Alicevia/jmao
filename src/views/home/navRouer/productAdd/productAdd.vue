<template>
  <div>
    <a-table
      :columns="columns"
      :scroll="{x:1000,y:570}"
      size='middle'
      :bordered="true"
      :pagination="{
          defaultPageSize:20,
          size:'middle',
          position:'bottom'
        }"
      :dataSource="data"
    >
      <a slot="action" slot-scope="item" href="javascript:;">action</a>
    </a-table>

  </div>
</template>

<script>
const columns = [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    width: "25%",
    align: "center"
  },
  { title: "Age", dataIndex: "age", key: "age", width: "25%", align: "center" },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
    width: "25%",
    align: "center"
  },

  {
    title: "Action",
    key: "operation",
    width: "25%",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
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