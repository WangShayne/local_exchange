<template>
  <div class="scroll-wrap">
    <ScrollContainer ref="scrollRef">
      <ul class="mb-0">
        <template v-for="item in accState.failList" :key="item.timestamp">
          <li :style="{ border: '1px solid #eee' }">
            {{ formatToDateTime(item.timestamp, 'DD-MM hh:mm:ss') }} : {{ item.error }}
          </li>
        </template>
      </ul>
    </ScrollContainer>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, unref, watch, onMounted } from 'vue';
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
  onMounted(() => {
    scrollBottom();
  });
  watch(
    () => accState.value,
    () => {
      scrollBottom();
    },
  );
</script>
<style lang="less" scoped>
  .scroll-wrap {
    width: 80%;
    height: 72px;
    background-color: @component-background;
  }
</style>
