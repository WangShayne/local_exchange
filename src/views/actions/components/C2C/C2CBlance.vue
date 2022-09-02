<template>
  <BasicTable
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
      <a-button type="primary" @click="openModal"> 修改 </a-button>
    </template>
  </BasicTable>
  <C2CBlanceModal @register="register2" :minHeight="100" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  // table
  import { BasicTable } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './C2CBlanceData';

  // modal

  import { useModal } from '/@/components/Modal';
  import C2CBlanceModal from './C2CBlanceModal.vue';

  const canResize = ref(false);
  const loading = ref(false);
  const striped = ref(true);
  const border = ref(true);
  const columns = getBasicColumns();
  const data = getBasicData();

  // modal
  const [register2, { openModal: openModal1 }] = useModal();
  const openModal = () => {
    openModal1(true);
  };
</script>
