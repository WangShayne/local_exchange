<template>
  <Card title="交易账户" :bordered="false" class="!mb-4">
    <a-row>
      <a-col :span="4" class="!mr-8">
        <SearchAccount />
      </a-col>
      <a-col :span="8">
        <DualSide />
      </a-col>
      <a-col :span="10">
        <ErrorLog v-if="failList.length" />
      </a-col>
    </a-row>
  </Card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { Card } from 'ant-design-vue';
  import SearchAccount from './searchAccount.vue';
  import DualSide from './dualSide.vue';
  import ErrorLog from './errorLog.vue';

  import { useAccountsStore } from '/@/store/modules/accounts';
  const store = useAccountsStore();
  const failList = computed(() => store.state.failList || []);
</script>

<style scoped lang="less">
  :deep(.vben-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
    margin-bottom: 0 !important;
  }
</style>
