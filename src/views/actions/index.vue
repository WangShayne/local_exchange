<template>
  <div>
    <PageWrapper>
      <SearchAccount />
      <div v-if="activeAccount">
        <Blance />
        <C2C />
        <Order />
        <Infos />
      </div>
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { computed } from 'vue';
  import { useAccountsStore } from '/@/store/modules/accounts';

  import SearchAccount from './components/searchAccount.vue';
  import Blance from './components/blance/blance.vue';
  import C2C from './components/C2C/C2C.vue';
  import Order from './components/order.vue';
  import Infos from './components/infos/infos.vue';
  const store = useAccountsStore();
  const activeAccount = computed(() => store.getActiveAccount);
  /* const clear = store.resetAllState(); */
</script>

<style></style>
