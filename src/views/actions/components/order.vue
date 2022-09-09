<template>
  <Card title="委托" :bordered="false" class="!mb-4">
    <a-row>
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="!mb-8"
            ><a-form layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
              <a-form-item label="价格">
                <a-input v-model:value="formStateLimitBuy.price" placeholder="请输入价格" />
              </a-form-item>
              <a-form-item label="数量">
                <a-input v-model:value="formStateLimitBuy.amount" placeholder="请输入数量" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary">限价买</a-button>
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :span="24">
            <a-form layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
              <a-form-item label="价格">
                <a-input v-model:value="formStateLimitSell.price" placeholder="请输入价格" />
              </a-form-item>
              <a-form-item label="数量">
                <a-input v-model:value="formStateLimitSell.amount" placeholder="请输入数量" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary">限价卖</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="!mb-8"
            ><a-form layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
              <a-form-item label="数量">
                <a-input v-model:value="formStateMarketBuy.amount" placeholder="请输入数量" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary">市价买</a-button>
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :span="24">
            <a-form layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
              <a-form-item label="数量">
                <a-input v-model:value="formStateMarketSell.amount" placeholder="请输入数量" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary">市价卖</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </Card>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Card } from 'ant-design-vue';
  const formStateLimitBuy = reactive({
    price: '',
    amount: '',
  });
  const formStateLimitSell = reactive({
    price: '',
    amount: '',
  });
  const formStateMarketBuy = reactive({
    amount: '',
  });

  const formStateMarketSell = reactive({
    amount: '',
  });
</script>
