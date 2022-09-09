<template>
  <BasicTable
    title="仓位"
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    :striped="striped"
    :bordered="border"
    :pagination="false"
    :actionColumn="actionColumn"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              label: '平仓',
              type: 'primary',
              popConfirm: {
                title: '确定平仓吗？',
                confirm: handleClick.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { ref, watch, toRaw } from 'vue';

  // table
  import { BasicTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './positionsData';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { closePosition } from '/@/api/order/order';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const accStore = useAccountsStore();
  const actionColumn = {
    width: 150,
    title: 'Action',
    dataIndex: 'action',
  };
  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const columns = getBasicColumns();
  const data = ref([]);

  function handleClick(record: Recordable) {
    console.log('点击了平仓', record);
    closePosition({
      id: accStore.id,
      symbol: record.symbol,
      quantity: record.quantity,
    })
      .then(() => {
        createMessage.success('平仓成功');
      })
      .catch(() => {
        createMessage.error('平仓失败');
      });
  }

  watch(
    () => accStore.state,
    (val) => {
      data.value = [];
      const { positionList } = toRaw(val);
      data.value = positionList as never[];
    },
  );
</script>
