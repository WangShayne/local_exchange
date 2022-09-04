<template>
  <Card title="交易参数" :bordered="false" class="!mb-4">
    <a-form>
      <a-form-item>
        <a-select
          v-model:value="value"
          show-search
          placeholder="下拉选择BTCUSDT或ETHUSDT或手动输入交易对"
          style="width: 400px"
          :options="options"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @search="fetchUser"
        >
          <template v-if="fetching" #notFoundContent>
            <a-spin size="small" />
          </template>
        </a-select>
      </a-form-item>
    </a-form>
    <C2CBlance />
  </Card>
</template>

<script setup lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { debounce } from 'lodash-es';
  import C2CBlance from './C2CBlance.vue';

  const fetching = ref(false);
  const value = ref<String | undefined>('ETHUSDT');
  const options = ref<SelectProps['options']>([
    // { value: 'BTC/USDT', label: 'BTC/USDT' },
    // { value: 'ETH/USDT', label: 'ETH/USDT' },
    // { value: 'tom', label: 'Tom' },
  ]);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleBlur = () => {
    console.log(value.value);
  };
  const handleFocus = () => {
    console.log('focus');
  };
  // const filterOption = (input: string, option: any) => {
  //   return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  // };
  let lastFetchId = 0;
  const fetchUser = debounce((value) => {
    console.log('fetching user', value);
    lastFetchId += 1;
    const fetchId = lastFetchId;
    options.value = [];
    fetching.value = true;
    fetch('https://randomuser.me/api/?results=5')
      .then((response) => response.json())
      .then((body) => {
        if (fetchId !== lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map((user) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        options.value = data;
        fetching.value = false;
      });
  }, 300);
</script>
