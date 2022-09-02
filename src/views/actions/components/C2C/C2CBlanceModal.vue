<template>
  <BasicModal v-bind="$attrs" destroyOnClose @register="register" title="账户划转">
    <template v-if="loading">
      <a-spin />
    </template>
    <template v-if="!loading">
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" class="max-w-screen-sm">
        <a-form-item label="改单双向">
          <a-select
            v-model:value="province"
            :options="provinceData.map((pro) => ({ value: pro }))"
          />
        </a-form-item>
        <a-form-item label="改逐全仓">
          <a-select v-model:value="secondCity" :options="cities.map((city) => ({ value: city }))" />
        </a-form-item>
        <a-form-item label="杠杆">
          <a-input placeholder="input placeholder" type="number">
            <!-- 输入框没值时候显示 -->
            <template #prefix> x </template>
          </a-input>
        </a-form-item>
      </a-form>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  const loading = ref(false);
  // const [register, { setModalProps, redoModalHeight }] = useModalInner();
  const [register] = useModalInner();
  // setTimeout(() => {
  //   loading.value = false;
  // }, 3000);

  const provinceData = ['Zhejiang', 'Jiangsu'];
  const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
  };
  const province = ref(provinceData[0]);
  const secondCity = ref(cityData[province.value][0]);
  const cities = computed(() => {
    return cityData[province.value];
  });
  watch(
    () => province,
    (val) => {
      secondCity.value = cityData[val.value][0];
    },
  );
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
