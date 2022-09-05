import { defineStore } from 'pinia';
import { store } from '/@/store';
import { QuantityResultModel } from '/@/api/order/model/orderModel';

export interface QuantityProps {
  marketOpenList: QuantityResultModel[];
  limitOpenList: QuantityResultModel[];
  limitCloseList: QuantityResultModel[];
}

export const useQuantityStore = defineStore({
  id: 'quantity',
  state: (): QuantityProps => ({
    marketOpenList: [],
    limitOpenList: [],
    limitCloseList: [],
  }),
  getters: {
    getMarketOpenList(): QuantityResultModel[] {
      return this.marketOpenList;
    },
    getLimitOpenList(): QuantityResultModel[] {
      return this.limitOpenList;
    },
    getLimitCloseList(): QuantityResultModel[] {
      return this.limitCloseList;
    },
  },
  actions: {
    // 设置市价开仓数量列表
    setMarketOpenList(params: QuantityResultModel[]) {
      this.marketOpenList = params;
    },
    // 设置限价多头开仓数量列表
    setLimitOpenList(params: QuantityResultModel[]) {
      this.limitOpenList = params;
    },
    // 设置限价空头开仓数量列表
    setLimitCloseList(params: QuantityResultModel[]) {
      this.limitCloseList = params;
    },
  },
});

export function useQuantityStoreWithOut() {
  return useQuantityStore(store);
}
