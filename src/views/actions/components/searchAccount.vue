<template>
  <Card title="交易账户" :bordered="false" class="!mb-4">
    <a-form>
      <a-form-item>
        <a-select
          v-model:value="value"
          show-search
          placeholder="下拉或根据别名搜索账户"
          style="width: 200px"
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
  </Card>
</template>

<script setup lang="ts">
  import { SelectProps } from 'ant-design-vue';
  import { computed, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { debounce } from 'lodash-es';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { getAccounts, getAccoutByName } from '/@/api/account/account';

  const store = useAccountsStore();
  const ativeAccount = computed(() => store.getActiveAccount);
  const fetching = ref(false);
  const value = ref<String | undefined>('');
  value.value = ativeAccount.value;

  // const accList = await getAccounts();
  // console.log(accList);

  const options = ref<SelectProps['options']>([
    // { value: 'jack', label: 'Jack' },
    // { value: 'lucy', label: 'Lucy' },
    // { value: 'tom', label: 'Tom' },
  ]);

  getAccounts().then((res) => {
    console.log(res);
    res.forEach((item: any) => {
      options.value?.push({ value: item.trader_id, label: item.name });
    });
  });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    store.setActiveAccount(value);
  };
  const handleBlur = () => {
    console.log(ativeAccount);
    console.log(value.value);
  };
  const handleFocus = () => {
    console.log('focus');
  };
  // const filterOption = (input: string, option: any) => {
  //   return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  // };
  // let lastFetchId = 0;
  const fetchUser = debounce((value) => {
    console.log('fetching user', value);
    // lastFetchId += 1;
    // const fetchId = lastFetchId;
    options.value = [];
    fetching.value = true;
    getAccoutByName(value).then((res) => {
      res.forEach((item: any) => {
        options.value?.push({ value: item.trader_id, label: item.name });
      });
      fetching.value = false;
    });
    // fetch('https://randomuser.me/api/?results=5')
    //   .then((response) => response.json())
    //   .then((body) => {
    //     if (fetchId !== lastFetchId) {
    //       // for fetch callback order
    //       return;
    //     }
    //     const data = body.results.map((user) => ({
    //       label: `${user.name.first} ${user.name.last}`,
    //       value: user.login.username,
    //     }));
    //     options.value = data;
    //     fetching.value = false;
    //   });
  }, 300);
</script>
