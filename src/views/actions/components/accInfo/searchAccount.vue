<template>
  <BasicForm
    autoFocusFirstItem
    :showActionButtonGroup="false"
    :schemas="schemas"
    :actionColOptions="{ span: 24 }"
  >
    <template #remoteSearch="{ model, field }">
      <ApiSelect
        :api="getAccoutByNameOpt"
        showSearch
        v-model:value="model[field]"
        :filterOption="false"
        resultField="list"
        labelField="name"
        valueField="trader_id"
        :params="searchParams"
        @search="onSearch"
        @change="selectChange"
      />
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
  import { computed, unref, ref } from 'vue';
  import { BasicForm, FormSchema, ApiSelect } from '/@/components/Form/index';
  import { getAccoutByNameOpt } from '/@/api/account/account';
  import { useDebounceFn } from '@vueuse/core';
  import { useAccountsStore } from '/@/store/modules/accounts';

  const accStore = useAccountsStore();
  const activeAcc = computed(() => accStore.id) || '';
  const keyword = ref<string>('');
  const searchParams = computed<Recordable>(() => {
    return { name: unref(keyword) };
  });
  const schemas: FormSchema[] = [
    {
      field: 'field32',
      component: 'Input',
      label: '账户',
      helpMessage: ['交易账户', '下拉选择或输入搜索交易账户'],
      required: true,
      slot: 'remoteSearch',
      colProps: {
        span: 24,
      },
      defaultValue: unref(activeAcc),
    },
  ];
  // const options = ref<Recordable[]>([]);
  const onSearch = useDebounceFn((value: string) => {
    if (!value) {
      return;
    }
    keyword.value = value;
  }, 500);

  const selectChange = (value: any) => {
    accStore.setActiveAccountId(value);
  };
</script>
