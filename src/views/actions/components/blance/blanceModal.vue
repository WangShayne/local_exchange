<template>
  <BasicModal v-bind="$attrs" destroyOnClose @register="register" title="账户划转">
    <template v-if="loading">
      <a-spin />
    </template>
    <template v-if="!loading">
      <a-form :label-col="{ span: 4 }">
        <a-row>
          <a-col :span="12">
            <a-form-item label="从">
              <a-select
                v-model:value="province"
                style="width: 140px"
                :options="provinceData.map((pro) => ({ value: pro }))"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" class="!flex">
            <a-form-item label="到">
              <a-select
                v-model:value="secondCity"
                style="width: 140px"
                :options="cities.map((city) => ({ value: city }))"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item>
              <a-input-search placeholder="input placeholder">
                <!-- 输入框没值时候显示 -->
                <template #suffix> 可用：<samp>0.00000000</samp> </template>
                <template #enterButton>
                  <a-button>全部划转</a-button>
                </template></a-input-search
              >
            </a-form-item>
          </a-col>
        </a-row>
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
