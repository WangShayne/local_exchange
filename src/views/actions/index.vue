<template>
  <div>
    <PageWrapper>
      <AccInfo />
      <Blance />
      <ChangeConfig />
      <Order />
      <Infos />
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { computed, onMounted } from 'vue';
  import { useIntervalFn } from '@vueuse/core';
  import { useAccountsStore } from '/@/store/modules/accounts';

  import AccInfo from './components/accInfo/index.vue';
  import Blance from './components/blance/blance.vue';
  // import C2C from './components/C2C/C2C.vue';
  import ChangeConfig from './components/changeConfig/changeConfig.vue';
  import Order from './components/order.vue';
  import Infos from './components/infos/infos.vue';
  const store = useAccountsStore();
  const id = computed(() => store.id);
  // const { pause, resume, isActive } = useIntervalFn(() => {
  onMounted(() => {
    const { isActive } = useIntervalFn(() => {
      if (id.value) {
        store.getAccountState(id.value);
      }
    }, 5000);
    console.log(isActive);
  });
</script>

<style></style>
