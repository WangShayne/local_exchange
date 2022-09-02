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
    >
      <template #toolbar>
        <a-button type="primary" @click="openModal"> 划转 </a-button>
      </template>
    </BasicTable>
    <BlanceModal @register="register1" :minHeight="100" />
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';

  // table
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './blanceData';
  // modal

  import { useModal } from '/@/components/Modal';
  import BlanceModal from './blanceModal.vue';

  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const columns = getBasicColumns();
  const data = getBasicData();

  // modal
  const [register1, { openModal: openModal1 }] = useModal();
  const openModal = () => {
    openModal1(true);
  };
</script>
