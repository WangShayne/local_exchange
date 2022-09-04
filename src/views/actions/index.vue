<template>
  <div>
    <PageWrapper>
      <AccInfo />
      <Blance />
      <C2C />
      <Order />
      <Infos />
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  // import { computed } from 'vue';
  // import { useAccountsStore } from '/@/store/modules/accounts';

  import AccInfo from './components/accInfo/index.vue';
  import Blance from './components/blance/blance.vue';
  import C2C from './components/C2C/C2C.vue';
  import Order from './components/order.vue';
  import Infos from './components/infos/infos.vue';
  // const store = useAccountsStore();
  // const activeAccount = computed(() => store.getActiveAccount);
  /* const clear = store.resetAllState(); */
</script>

<style></style>
