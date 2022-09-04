<template>
  <BasicForm :showResetButton="false" @register="register" @submit="handleSubmit" />
</template>
<script setup lang="ts">
  import { computed, unref, watch } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { setDualSide } from '/@/api/change/change';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useAccountsStore } from '/@/store/modules/accounts';

  const { createMessage } = useMessage();
  const accStore = useAccountsStore();
  const id = computed(() => accStore.id);
  const accState = computed(() => accStore.state);
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
      defaultValue: unref(accState.value.dualSide) ? 1 : 0,
    },
  ];
  const [register, { setFieldsValue }] = useForm({
    // labelWidth: 120,
    schemas,
    submitButtonOptions: {
      text: '修改持仓模式',
    },
    actionColOptions: { span: 8 },
  });

  const handleSubmit = (values: Recordable) => {
    setDualSide({ id: unref(id), dualSide: values.field4 === 0 ? false : true })
      .then(() => {
        createMessage.success('修改成功');
      })
      .catch(() => {
        createMessage.error('修改失败');
      });
  };

  watch(
    () => accState.value,
    (val) => {
      setFieldsValue({ field4: val.dualSide ? 1 : 0 });
    },
  );
</script>
