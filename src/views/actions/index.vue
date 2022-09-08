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
  import { computed } from 'vue';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { useWebSocket } from '@vueuse/core';

  import AccInfo from './components/accInfo/index.vue';
  import Blance from './components/blance/blance.vue';
  import ChangeConfig from './components/changeConfig/changeConfig.vue';
  import Order from './components/order/index.vue';
  import Infos from './components/infos/infos.vue';

  const store = useAccountsStore();
  const id = computed(() => store.id);
  console.log(id);

  const onMessage = (_: any, msg: any) => {
    let { data } = msg;
    data = JSON.parse(data);
    if (id.value) {
      const state = data.data.find((item: any) => item.id === id.value);
      store.setAccountState(state);
    }
  };
  useWebSocket('ws://35.79.47.22:9630/ws', {
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        alert('Failed to connect WebSocket after 3 retries');
      },
    },
    onMessage,
  });
</script>

<style></style>
