<template>
  <BasicTable
    title="订单"
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    :striped="striped"
    :bordered="border"
    :pagination="{ pageSize: 10 }"
    :actionColumn="actionColumn"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              label: '取消',
              type: 'primary',
              onClick: handleClick.bind(null, record),
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  // table
  import { BasicTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './ordersData';

  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const columns = getBasicColumns();
  const data = getBasicData();
  const actionColumn = {
    width: 150,
    title: 'Action',
    dataIndex: 'action',
  };

  function handleClick(record: Recordable) {
    console.log('点击了删除', record);
  }
</script>