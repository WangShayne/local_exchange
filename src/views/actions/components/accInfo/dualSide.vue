<template>
  <BasicForm :showResetButton="false" @register="register" @submit="handleSubmit" />
</template>
<script setup lang="ts">
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  // import { useMessage } from '/@/hooks/web/useMessage';
  import { setDualSide } from '/@/api/change/change';
  // const { createMessage } = useMessage();
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { computed, unref } from 'vue';
  const accStore = useAccountsStore();
  const id = computed(() => accStore.id);
  const schemas: FormSchema[] = [
    {
      field: 'field4',
      component: 'Select',
      label: '持仓模式',
      colProps: {
        span: 8,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '单向',
            value: 0,
            key: false,
          },
          {
            label: '双向',
            value: 1,
            key: true,
          },
        ],
      },
    },
  ];
  const [register] = useForm({
    // labelWidth: 120,
    schemas,
    submitButtonOptions: {
      text: '修改持仓模式',
    },
    actionColOptions: { span: 10 },
  });

  const handleSubmit = (values: Recordable) => {
    setDualSide({ id: unref(id), dualSide: values.field4 === 0 ? false : true });
  };
</script>
