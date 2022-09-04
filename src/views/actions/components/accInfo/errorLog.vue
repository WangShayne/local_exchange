<template>
  <div class="scroll-wrap">
    <ScrollContainer class="mt-4" ref="scrollRef">
      <ul class="p-3">
        <template v-for="item in accState.failList" :key="item.timestamp">
          <li class="p-2" :style="{ border: '1px solid #eee' }">
            {{ formatToDateTime(item.timestamp, 'DD-MM hh:mm:ss') }} : {{ item.error }}
          </li>
        </template>
      </ul>
    </ScrollContainer>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, unref, watch } from 'vue';
  import { ScrollContainer, ScrollActionType } from '/@/components/Container/index';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { formatToDateTime } from '/@/utils/dateUtil';
  const accStore = useAccountsStore();
  const accState = computed(() => accStore.state);
  const scrollRef = ref<Nullable<ScrollActionType>>(null);
  const getScroll = () => {
    const scroll = unref(scrollRef);
    if (!scroll) {
      throw new Error('scroll is Null');
    }
    return scroll;
  };
  const scrollBottom = () => {
    getScroll().scrollBottom();
  };
  watch(
    () => accState,
    () => {
      scrollBottom();
    },
  );
</script>
<style lang="less" scoped>
  .scroll-wrap {
    width: 50%;
    height: 300px;
    background-color: @component-background;
  }
</style>
