<template>
  <a-card title="做多">
    <div class="grid grid-cols-5">
      <!-- 市价开仓 -->
      <a-card>
        <a-form :model="formMarket">
          <!-- <a-form-item label="百分比">
            
          </a-form-item> -->
          <a-form-item label="最大数量">
            <a-input
              v-model:value="formMarket.MaxQuantity"
              placeholder="input placeholder"
              disabled
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input v-model:value="formMarket.quantity" placeholder="input placeholder">
              <a-slider v-model:value="formMarket.percent" :tooltip-visible="true" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary">市价下单</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 限价开仓 -->
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
  import { reactive } from 'vue';

  const formMarket = reactive({
    percent: 30,
    MaxQuantity: 'A',
    quantity: 'B',
  });
  const formLimit = reactive({
    percent: 30,
    MaxQuantity: 'A',
    quantity: 'B',
  });
</script>
