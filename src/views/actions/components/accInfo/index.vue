<template>
  <Card title="交易账户" :bordered="false" class="!mb-4">
    <a-row>
      <a-col :span="4" class="!mr-8">
        <SearchAccount />
      </a-col>
      <a-col :span="6">
        <DualSide />
      </a-col>
    </a-row>
    <ErrorLog />
  </Card>
</template>

<script setup lang="ts">
  import { Card } from 'ant-design-vue';
  import SearchAccount from './searchAccount.vue';
  import DualSide from './dualSide.vue';
  import ErrorLog from './errorLog.vue';
</script>
