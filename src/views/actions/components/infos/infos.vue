<template>
  <Card>
    <a-row>
      <a-col :span="12">
        <Positions />
      </a-col>
      <a-col :span="12">
        <Orders />
      </a-col>
    </a-row>
  </Card>
</template>

<script setup lang="ts">
  import { Card } from 'ant-design-vue';
  import Orders from './orders.vue';
  import Positions from './positions.vue';
</script>
