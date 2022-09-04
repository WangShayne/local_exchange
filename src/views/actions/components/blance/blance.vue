<template>
  <Card title="账户明细" ghost :bordered="false" class="!mb-4">
    <BasicTable
      title=" "
      titleHelpMessage="请注意资金安全!"
      :columns="columns"
      :dataSource="data"
      :canResize="canResize"
      :loading="loading"
      :striped="striped"
      :bordered="border"
      :pagination="false"
      :showIndexColumn="false"
      :useSearchForm="false"
    >
      <template #toolbar>
        <a-button type="primary" @click="openModal"> 划转 </a-button>
      </template>
    </BasicTable>
    <BlanceModal @register="register1" :minHeight="100" />
  </Card>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { Card } from 'ant-design-vue';

  // table
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns } from './blanceData';
  // modal

  import { useModal } from '/@/components/Modal';
  import BlanceModal from './blanceModal.vue';

  // store
  import { useAccountsStore } from '/@/store/modules/accounts';
  const store = useAccountsStore();
  const accState = computed(() => store.state);

  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const columns = getBasicColumns();
  const data = ref([]);
  // modal
  const [register1, { openModal: openModal1 }] = useModal();
  const openModal = () => {
    openModal1(true);
  };

  watch(
    () => accState.value,
    (val) => {
      const { balance, available, spotBalance, spotAvailable } = val;
      data.value = [{ balance, available, spotBalance, spotAvailable } as never];
    },
  );
</script>
