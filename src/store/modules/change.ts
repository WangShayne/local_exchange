import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ConfigParams } from '/@/api/change/model/changeModel';

export interface changeParams {
  symbol?: string;
  marginType?: string;
  leverage?: number;
}

export const useChangeStore = defineStore({
  id: 'change',
  state: (): changeParams => ({
    symbol: '',
    marginType: '',
    leverage: 1,
  }),
  getters: {},
  actions: {
    setChangeConfig(params: ConfigParams) {
      this.symbol = params.symbol;
      this.marginType = params.marginType;
      this.leverage = params.leverage;
    },
  },
});

export function useChangeStoreWithOut() {
  return useChangeStore(store);
}
