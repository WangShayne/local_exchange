<template>
  <Card>
    <template #title>
      <div class="flex flex-col justify-center align-center">
        <div class="text-center text-lg">
          <a-statistic title="当前价格" :value="price" />
        </div>
        <div class="mt-4 flex justify-center aling-center">
          <a-radio-group v-model:value="mode" button-style="solid" size="large">
            <a-radio-button value="Long">做多</a-radio-button>
            <a-radio-button value="Short">做空</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-5">
      <!-- 市价开仓 -->
      <Card>
        <a-form layout="vertical" :model="formMarket">
          <a-form-item label="百分比">
            <a-slider
              v-model:value="formMarket.percent"
              :marks="marks"
              @change="sliderMarketOpen"
            />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input v-model:value="formMarket.MaxQuantity" disabled />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formMarket.quantity" placeholder="请输入数量" />
          </a-form-item>
          <a-form-item>
            <a-popconfirm @confirm="handleMarketOpen">
              <template #title>
                <p> 确定<span class="text-red-900">市价开仓</span>吗? </p>
              </template>
              <a-button type="primary">市价开仓</a-button>
            </a-popconfirm>
          </a-form-item>
        </a-form>
      </Card>
      <!-- 限价开仓 -->
      <Card>
        <a-form layout="vertical" :model="formLimit">
          <a-form-item label="百分比">
            <a-slider v-model:value="formLimit.percent" :marks="marks" @change="sliderLimitOpen" />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input v-model:value="formLimit.MaxQuantity" disabled />
          </a-form-item>
          <a-form-item label="价格">
            <a-input v-model:value="formLimit.price" />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimit.quantity" placeholder="请输入数量" />
          </a-form-item>
          <a-form-item>
            <a-popconfirm @confirm="handleLimitOpen">
              <template #title>
                <p> 确定<span class="text-red-900">限价开仓</span>吗? </p>
              </template>
              <a-button type="primary">限价开仓</a-button>
            </a-popconfirm>
          </a-form-item>
        </a-form>
      </Card>
      <!-- 市价平仓 -->
      <Card>
        <a-form layout="vertical" :model="formMarketClose">
          <a-form-item label="数量">
            <a-input v-model:value="formMarketClose.quantity" placeholder="请输入数量" />
          </a-form-item>
          <a-form-item>
            <a-popconfirm @confirm="handleMarketClose">
              <template #title>
                <p> 确定<span class="text-red-900">市价平仓</span>吗? </p>
              </template>
              <a-button type="primary">市价平仓</a-button>
            </a-popconfirm>
          </a-form-item>
        </a-form>
      </Card>
      <!-- 限价平仓 -->
      <Card>
        <a-form layout="vertical" :model="formLimitClose">
          <a-form-item label="价格">
            <a-input v-model:value="formLimitClose.price" />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimitClose.quantity" placeholder="请输入数量" />
          </a-form-item>
          <a-form-item>
            <a-popconfirm @confirm="handleLimitClose">
              <template #title>
                <p> 确定<span class="text-red-900">限价平仓</span>吗? </p>
              </template>
              <a-button type="primary">限价平仓</a-button>
            </a-popconfirm>
          </a-form-item>
        </a-form>
      </Card>
      <!-- 止损单 -->
      <Card>
        <a-form layout="vertical" :model="formStopMarket">
          <a-form-item label="价格">
            <a-input v-model:value="formStopMarket.price" />
          </a-form-item>
          <a-form-item>
            <a-popconfirm @confirm="handleFormStopMarket">
              <template #title>
                <p> 确定<span class="text-red-900">止损下单</span>吗? </p>
              </template>
              <a-button type="primary">止损下单</a-button>
            </a-popconfirm>
          </a-form-item>
        </a-form>
      </Card>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { Card } from 'ant-design-vue';
  import { computed, reactive, ref, unref, watch } from 'vue';
  import { getQuantity, postOrder } from '/@/api/order/order'; //postOrder
  import { useAccountsStore } from '/@/store/modules/accounts';
  import { useQuantityStore } from '/@/store/modules/quantity';
  import { useChangeStore } from '/@/store/modules/change';
  import { QuantityResultModel } from '/@/api/order/model/orderModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const accStore = useAccountsStore();
  const quantityStore = useQuantityStore();
  const changeStore = useChangeStore();

  const id = computed(() => accStore.id);
  const symbol = computed(() => changeStore.symbol);

  const marks = ref<Record<number, any>>({
    0: 0,
    25: 25,
    50: 50,
    75: 75,
    100: 100,
  });

  const mode = ref<string>('Long');
  // const tradeSide = computed(() => {
  //   return mode.value === 'Long' ? 'BUY' : '';
  // });

  const price = ref(0); //当前价格

  /**
   * @description: 市价开仓
   * @param {
   *      "orderType": "MARKET",
   *      "tradeSide": "BUY",
   *      "quantity": 0.004,
   *      "isOpen": true}
   * @return {*}
   */

  // 市价开仓表单
  const formMarket = reactive({
    percent: 0,
    MaxQuantity: 0,
    quantity: 0,
  });

  // 市价开仓选择百分比
  const sliderMarketOpen = async (value: number) => {
    // 获取市价开仓数量
    getQuantity({ id: unref(id), symbol: unref(symbol), percent: value }).then((res) => {
      quantityStore.setMarketOpenList(res);
      res.forEach((item: QuantityResultModel) => {
        if (
          item.tradeSide == (mode.value == 'Long' ? 'BUY' : 'SELL') &&
          item.symbol == unref(symbol)
        ) {
          formMarket.percent = item.percent as number;
          price.value = item.price as number;
          formMarket.MaxQuantity = item.quantity as number;
          formMarket.quantity = item.quantity as number;
        }
      });
    });
  };

  // 提交市价开仓下达订单
  const handleMarketOpen = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'MARKET',
      tradeSide: mode.value == 'Long' ? 'BUY' : 'SELL',
      quantity: Number(formMarket.quantity),
      isOpen: true,
    })
      .then(() => {
        createMessage.success('下单成功');
      })
      .catch((err) => {
        createMessage.error(err.message);
      });
  };

  /**
   * @description: 限价开仓
   * @param {
   *      "orderType": "LIMIT",
   *      "tradeSide": "BUY",
   *      "quantity": 0.004,
   *      "isOpen": true}
   * @return {*}
   */

  // 限价开仓表单
  const formLimit = reactive({
    percent: 0,
    MaxQuantity: 0,
    price: 0,
    quantity: 0,
  });
  // 限价开仓选择百分比
  const sliderLimitOpen = async (value: number) => {
    console.log(value);
    if (formLimit.price == 0 || formLimit.price == null) {
      createMessage.error('请输入价格');
      formLimit.percent = 0;
      return;
    }
    // 获取限价开仓数量
    getQuantity({
      id: unref(id),
      symbol: unref(symbol),
      percent: value,
      price: Number(formLimit.price),
      tradeSide: mode.value == 'Long' ? 'BUY' : 'SELL',
    }).then((res) => {
      console.log(res);
      quantityStore.setLimitOpenList(res);
      res.forEach((item: QuantityResultModel) => {
        if (item.tradeSide == (mode.value == 'Long' ? 'BUY' : 'SELL')) {
          formLimit.MaxQuantity = item.quantity as number;
          formLimit.quantity = item.quantity as number;
        }
      });
    });
  };

  // 提交限价开仓下达订单
  const handleLimitOpen = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'LIMIT',
      tradeSide: mode.value == 'Long' ? 'BUY' : 'SELL',
      quantity: Number(formLimit.quantity),
      price: Number(formLimit.price),
      isOpen: true,
    })
      .then(() => {
        createMessage.success('下单成功');
      })
      .catch((err) => {
        createMessage.error(err.message);
      });
  };

  /**
   * @description: 市价平仓
   * @param {
   *      "orderType": "MARKET",
   *      "tradeSide": "SELL",
   *      "quantity": 0.004,
   *      "isOpen": false}
   * @return {*}
   */

  const formMarketClose = reactive({
    quantity: 0,
  });

  const handleMarketClose = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'MARKET',
      tradeSide: mode.value == 'Long' ? 'SELL' : 'BUY',
      quantity: Number(formMarketClose.quantity),
      isOpen: false,
    })
      .then(() => {
        createMessage.success('下单成功');
      })
      .catch((err) => {
        createMessage.error(err.message);
      });
  };

  /**
   * @description: 限价平仓
   * @param {
   *      "orderType": "LIMIT",
   *      "price": 0,
   *      "tradeSide": "SELL",
   *      "quantity": 0.004,
   *      "isOpen": false}
   * @return {*}
   */

  // 限价平仓表单
  const formLimitClose = reactive({
    price: 0,
    quantity: 0,
  });

  // 提交限价平仓下达订单
  const handleLimitClose = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'LIMIT',
      tradeSide: mode.value == 'Long' ? 'SELL' : 'BUY',
      quantity: Number(formLimitClose.quantity),
      price: Number(formLimitClose.price),
      isOpen: false,
    }).then(() => {
      createMessage.success('下单成功');
    });
  };

  /**
   * @description: 止损
   * @param {
   *      "orderType": "STOP_MARKET",
   *      "tradeSide": "SELL",
   *      "price": 0.004,
   * }
   * @return {*}
   */

  const formStopMarket = reactive({
    price: 0,
  });

  const handleFormStopMarket = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'STOP_MARKET',
      tradeSide: mode.value == 'Long' ? 'SELL' : 'BUY',
      price: Number(formStopMarket.price),
    })
      .then(() => {
        createMessage.success('下单成功');
      })
      .catch((err) => {
        createMessage.error(err.message);
      });
  };

  // watch state 变化
  watch(
    () => accStore.state,
    (val) => {
      // 市价下单
      const quantity = val.symbolQuantity;
      quantity?.forEach((item: QuantityResultModel) => {
        if (
          item.tradeSide == (mode.value == 'Long' ? 'BUY' : 'SELL') &&
          item.symbol == unref(symbol)
        ) {
          formMarket.percent = item.percent as number;
          price.value = item.price as number;
          formMarket.MaxQuantity = item.quantity as number;
          formMarket.quantity = item.quantity as number;
        }
      });
    },
  );
</script>

<style scoped lang="less">
  :deep(.ant-statistic-title) {
    font-size: 1.25rem !important;
  }

  :deep(.ant-statistic-content-value) {
    font-size: 2rem !important;
  }

  :deep(.ant-radio-button-wrapper) {
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 48px;
    font-size: 20px;
  }
</style>
