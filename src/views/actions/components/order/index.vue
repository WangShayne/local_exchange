<template>
  <a-card>
    <template #title>
      <div class="flex justify-start align-center">
        <div class="mr-8">
          <a-radio-group v-model:value="mode" button-style="solid">
            <a-radio-button value="Long">做多</a-radio-button>
            <a-radio-button value="Short">做空</a-radio-button>
          </a-radio-group>
        </div>
        <div>
          <span>当前价格:{{ price }}</span>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-5">
      <!-- 市价开仓 -->
      <a-card>
        <a-form layout="vertical" :model="formMarket">
          <a-form-item label="百分比">
            <a-slider
              v-model:value="formMarket.percent"
              :tooltip-visible="true"
              :marks="marks"
              @after-change="sliderMarketOpen"
            />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formMarket.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formMarket.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleMarketOpen">市价开仓</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 限价开仓 -->
      <a-card>
        <a-form layout="vertical" :model="formLimit">
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formLimit.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="价格">
            <a-input v-model:value="formLimit.price" />
          </a-form-item>
          <a-form-item label="数量百分比">
            <a-slider
              v-model:value="formLimit.percent"
              :tooltip-visible="true"
              :marks="marks"
              @after-change="sliderLimitOpen"
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimit.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleLimitOpen">限价开仓</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 市价平仓 -->
      <a-card>
        <a-form :model="formMarketClose">
          <a-form-item label="数量">
            <a-input v-model:value="formMarketClose.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleMarketClose">市价平仓</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 限价平仓 -->
      <a-card>
        <a-form :model="formLimitClose">
          <a-form-item label="价格">
            <a-input v-model:value="formLimitClose.price" />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimitClose.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleLimitClose">限价平仓</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 止损单 -->
      <a-card>
        <a-form :model="formStopMarket">
          <a-form-item label="价格">
            <a-input v-model:value="formStopMarket.price" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleFormStopMarket">止损下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </a-card>
</template>

<script setup lang="ts">
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
    console.log(value);
    // 获取市价开仓数量
    getQuantity({ id: unref(id), symbol: unref(symbol), percent: value }).then((res) => {
      console.log(res);
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
    }).then(() => {
      createMessage.success('下单成功');
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
    }).then(() => {
      createMessage.success('下单成功');
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
    }).then(() => {
      createMessage.success('下单成功');
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
    }).then(() => {
      createMessage.success('下单成功');
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
