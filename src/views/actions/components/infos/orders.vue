<template>
  <BasicTable
    title="订单"
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
      <template v-if="column.key === 'orderType'">
        {{ transOrderType(record.orderType) }}
      </template>
      <template v-if="column.key === 'tradeSide'">
        {{ record.tradeSide === 'BUY' ? '买入' : '卖出' }}
      </template>
      <template v-if="column.key === 'reduceOnly'">
        {{ record.reduceOnly ? 'true' : 'false' }}
      </template>
      <template v-if="column.key === 'closePosition'">
        {{ record.closePosition ? 'true' : 'false' }}
      </template>
      <template v-else-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              label: '取消',
              type: 'primary',
              popConfirm: {
                title: '确定取消订单吗？',
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
  import { getBasicColumns } from './ordersData';
  import { cancelOrder } from '/@/api/order/order';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const accStore = useAccountsStore();

  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const columns = getBasicColumns();
  const data = ref([]);
  const actionColumn = {
    width: 150,
    title: 'Action',
    dataIndex: 'action',
  };

  const transOrderType = (orderType: string) => {
    if (orderType === 'LIMIT') {
      return '限价';
    }
    if (orderType === 'MARKET') {
      return '市价';
    }
    if (orderType === 'STOP_MARKET') {
      return '止损';
    }
    return '';
  };

  function handleClick(record: Recordable) {
    cancelOrder({
      id: accStore.id,
      symbol: record.symbol,
      orderId: record.orderId,
    })
      .then(() => {
        createMessage.success({
          content: '取消订单成功',
        });
      })
      .catch(() => {
        createMessage.error({
          content: '取消订单失败',
        });
      });
  }

  watch(
    () => accStore.state,
    (val) => {
      data.value = [];
      const { orderList } = toRaw(val);
      data.value = orderList as never[];
    },
  );
</script>
