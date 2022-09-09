<template>
  <a-select
    v-model:value="state.value"
    show-search
    placeholder="请输入账号"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="state.data"
    @search="onSearch"
    @change="selectChange"
  />
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getAccoutByNameOpt } from '/@/api/account/account';
  // import { AccountResultModel } from '/@/api/account/model/accountModel';
  import { useDebounceFn } from '@vueuse/core';
  import { useAccountsStore } from '/@/store/modules/accounts';
  const accStore = useAccountsStore();
  // const activeAcc = computed(() => accStore.id) || '';
  const state = reactive({
    data: [],
    value: '',
  });

  const onSearch = useDebounceFn((value: string) => {
    if (!value) {
      return;
    }
    state.data = [];
    getAccoutByNameOpt({ name: value }).then((res) => {
      // const data = res.map((account) => ({
      //   label: account?.name,
      //   value: account?.tarder_id,
      // }));
      // state.data = data;
      console.log(res);
    });
  }, 500);

  const selectChange = (value: any) => {
    accStore.setActiveAccountId(value);
  };
</script>
