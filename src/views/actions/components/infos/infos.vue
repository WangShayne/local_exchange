<template>
  <Card>
    <Positions />
    <Orders />
  </Card>
</template>

<script setup lang="ts">
  import { Card } from 'ant-design-vue';
  import Orders from './orders.vue';
  import Positions from './positions.vue';
</script>
