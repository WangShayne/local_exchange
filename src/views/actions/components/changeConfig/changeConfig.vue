<template>
  <Card title="交易参数" :bordered="false" class="!mb-4">
    <a-form layout="inline" :model="formState">
      <a-form-item label="交易对">
        <a-input v-model:value="formState.symbol" placeholder="请收入交易对" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleChangeConfig">修改交易对</a-button>
      </a-form-item>
      <a-form-item label="仓位模式">
        <a-select
          ref="select"
          v-model:value="formState.marginType"
          style="width: 120px"
          :options="marginTypeOptions"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleChangeConfig">修改仓位模式</a-button>
      </a-form-item>
      <a-form-item label="杠杆">
        <a-input v-model:value="formState.leverage" placeholder="请输入杠杆倍数">
          <template #suffix>
            <samp>X</samp>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleChangeConfig">修改杠杆</a-button>
      </a-form-item>
    </a-form>
  </Card>
</template>

<script setup lang="ts">
  // import { BasicForm, FormSchema } from '/@/components/Form';
  // import { useMessage } from '/@/hooks/web/useMessage';
  // import type { UnwrapRef } from 'vue';
  import { reactive, onMounted, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { getChangeConfig, setChangeConfig } from '/@/api/change/change';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { useChangeStore } from '/@/store/modules/change';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  const accStore = useAccountsStore();
  const changeStore = useChangeStore();

  const formState = reactive({
    symbol: 'ETHUSDT',
    marginType: 'ISOLATED',
    leverage: 1,
  });

  const marginTypeOptions = [
    {
      label: '逐仓',
      value: 'ISOLATED',
    },
    {
      label: '全仓',
      value: 'CROSSED',
    },
  ];
  const handleChangeConfig = () => {
    setChangeConfig({
      id: accStore.id,
      symbol: formState.symbol,
      marginType: formState.marginType,
      leverage: formState.leverage,
    })
      .then((_) => {
        createMessage.success('修改成功');
        getNowConfig();
      })
      .catch((_) => {
        createMessage.error('修改失败');
      });
  };

  const getNowConfig = () => {
    // const res = await getChangeConfig();
    if (accStore.id) {
      getChangeConfig({
        id: accStore.id,
        symbol: formState.symbol,
      })
        .then((res) => {
          formState.marginType = res.marginType;
          formState.leverage = res.leverage;
          changeStore.setChangeConfig({
            symbol: formState.symbol,
            marginType: res.marginType,
            leverage: res.leverage,
          });
        })
        .catch((_) => {
          changeStore.setChangeConfig({
            symbol: formState.symbol,
            marginType: 'ISOLATED',
            leverage: 1,
          });
        });
    }
  };

  watch(
    () => accStore.id,
    () => {
      getNowConfig();
    },
  );

  onMounted(() => {
    getNowConfig();
  });
</script>
