import { defineStore } from 'pinia';
import { store } from '/@/store';
import { Persistent } from '/@/utils/cache/persistent';
import { ACTIVE_ACCOUNTS_KEY } from '/@/enums/cacheEnum';

export interface AccountsState {
  activeAccount: string;
}

export const useAccountsStore = defineStore({
  id: 'accounts',
  state: (): AccountsState => ({
    activeAccount: Persistent.getLocal(ACTIVE_ACCOUNTS_KEY) || '',
  }),
  getters: {
    getActiveAccount(): String {
      return this.activeAccount || Persistent.getLocal(ACTIVE_ACCOUNTS_KEY) || '';
    },
  },
  actions: {
    setActiveAccount(aac: string) {
      console.log(aac);
      this.activeAccount = aac;
      Persistent.setLocal(ACTIVE_ACCOUNTS_KEY, aac);
    },
    async resetAllState() {
      Persistent.clearAll();
    },
  },
});

export function useAccountsStoreWithOut() {
  return useAccountsStore(store);
}
