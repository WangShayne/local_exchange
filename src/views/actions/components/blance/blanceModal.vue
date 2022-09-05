<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="账户划转"
    @ok="confirmTranser"
    @visible-change="handleVisibleChange"
  >
    <template v-if="loading">
      <a-spin />
    </template>
    <template v-if="!loading">
      <a-form :label-col="{ span: 4 }">
        <a-row>
          <a-col :span="12">
            <a-form-item label="从">
              <a-select v-model:value="fromWallet" style="width: 140px" :options="fromData" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="到">
              <a-select v-model:value="toWallet" style="width: 140px" :options="toData" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="划转数量" class="w-11/12">
              <a-input placeholder="请输入划转金额" size="default" v-model:value="amount">
                <!-- 输入框没值时候显示 -->
                <!-- <template #suffix>
                  <a-button type="link" @click="handleAllTransfer">全部划转</a-button>
                </template> -->
              </a-input>
              <div class="flex justify-between items-center">
                <div>
                  可用：<samp style="color: #aaa">{{ available }}</samp>
                </div>
                <div>
                  <a-button type="link" @click="handleAllTransfer">全部划转</a-button>
                </div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { transferFund } from '/@/api/transfer/transfer';
  import { useMessage } from '/@/hooks/web/useMessage';

  // const emit = defineEmits(['close']);
  const store = useAccountsStore();
  const accState = computed(() => store.state);
  const loading = ref(false);
  // const [register, { setModalProps, redoModalHeight }] = useModalInner();
  const [register, { closeModal }] = useModalInner();
  const { createMessage } = useMessage();

  const fromData = [
    {
      label: '现货账户',
      value: '1',
    },
    {
      label: '合约账户',
      value: '0',
    },
  ];
  const toData = [
    {
      label: '现货账户',
      value: '1',
    },
    {
      label: '合约账户',
      value: '0',
    },
  ];
  const fromWallet = ref('1');
  const toWallet = ref('0');
  const amount = ref(0);
  const available = ref(0);
  const handleAllTransfer = () => {
    amount.value = available.value;
  };
  watch(
    () => fromWallet.value,
    (val) => {
      toWallet.value = toData[val];
      if (val === '1') {
        available.value = accState.value.spotAvailable as number;
      } else {
        available.value = accState.value.available as number;
      }
    },
  );

  const confirmTranser = () => {
    transferFund({
      id: accState.value.id,
      transferType: Number(fromWallet.value),
      percent: Number(amount.value),
    })
      .then(() => {
        createMessage.success('划转成功');
        closeModal();
      })
      .catch(() => {
        createMessage.error('划转失败');
      });
  };
  const handleVisibleChange = (val: boolean) => {
    if (val) {
      fromWallet.value = '1';
      toWallet.value = '0';
      amount.value = 0;
      available.value = accState.value.spotAvailable as number;
    }
  };
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
