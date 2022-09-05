<template>
  <a-card title="做多">
    <div class="grid grid-cols-5">
      <!-- 市价开仓 -->
      <a-card>
        <a-form layout="vertical" :model="formMarket">
          <a-form-item label="数量百分比">
            <a-slider
              v-model:value="formMarket.percent"
              :tooltip-visible="true"
              :marks="marks"
              @after-change="sliderMarketBuyOpen"
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
            <a-button type="primary" @click="handleMarketBuyOpen">市价下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 限价开仓 -->
      <a-card>
        <a-form layout="vertical" :model="formLimit">
          <a-form-item label="数量百分比">
            <a-slider
              v-model:value="formLimit.percent"
              :tooltip-visible="true"
              :marks="marks"
              @after-change="sliderLimitBuyOpen"
            />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formLimit.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="价格">
            <a-input v-model:value="formLimit.price" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimit.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleLimitBuyOpen">限价下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 市价平仓 -->
      <a-card>
        <a-form :model="formLimit">
          <a-form-item label="百分比">
            <a-slider v-model:value="formLimit.percent" :tooltip-visible="true" />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formLimit.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimit.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary">市价下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 限价平仓 -->
      <a-card>
        <a-form :model="formLimit">
          <a-form-item label="百分比">
            <a-slider v-model:value="formLimit.percent" :tooltip-visible="true" />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formLimit.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimit.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary">市价下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 止损单 -->
      <a-card>
        <a-form :model="formLimit">
          <a-form-item label="百分比">
            <a-slider v-model:value="formLimit.percent" :tooltip-visible="true" />
          </a-form-item>
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formLimit.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formLimit.quantity" placeholder="input placeholder" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary">市价下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, unref } from 'vue';
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
  const sliderMarketBuyOpen = async (value: number) => {
    console.log(value);
    // 获取市价开仓数量
    getQuantity({ id: unref(id), symbol: unref(symbol), percent: value }).then((res) => {
      console.log(res);
      quantityStore.setMarketOpenList(res);
      res.forEach((item: QuantityResultModel) => {
        if (item.tradeSide == 'BUY') {
          formMarket.MaxQuantity = item.quantity as number;
          formMarket.quantity = item.quantity as number;
        }
      });
    });
  };
  // 提交市价开仓下达订单
  const handleMarketBuyOpen = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'MARKET',
      tradeSide: 'BUY',
      quantity: formMarket.quantity,
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
  const sliderLimitBuyOpen = async (value: number) => {
    console.log(value);
    // 获取限价开仓数量
    getQuantity({ id: unref(id), symbol: unref(symbol), percent: value }).then((res) => {
      console.log(res);
      quantityStore.setLimitOpenList(res);
      res.forEach((item: QuantityResultModel) => {
        if (item.tradeSide == 'BUY') {
          formLimit.MaxQuantity = item.quantity as number;
          formLimit.quantity = item.quantity as number;
        }
      });
    });
  };

  // 提交限价开仓下达订单
  const handleLimitBuyOpen = () => {
    postOrder({
      id: unref(id),
      symbol: unref(symbol),
      orderType: 'LIMIT',
      tradeSide: 'BUY',
      quantity: formLimit.quantity,
      isOpen: true,
    }).then(() => {
      createMessage.success('下单成功');
    });
  };
</script>
