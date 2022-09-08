import { defineStore } from 'pinia';
import { store } from '/@/store';
import { Persistent } from '/@/utils/cache/persistent';
import { ACTIVE_ACCOUNTS_KEY } from '/@/enums/cacheEnum';
import { AccountResultModel } from '/@/api/account/model/accountModel';
import { StatesResultModel } from '/@/api/states/model/statesModel';
import { getAccounts } from '/@/api/account/account';

export interface AccountsState {
  id: string;
  allAccounts: AccountResultModel[];
  state: StatesResultModel;
}

export const useAccountsStore = defineStore({
  id: 'accounts',
  state: (): AccountsState => ({
    id: Persistent.getLocal(ACTIVE_ACCOUNTS_KEY) || '',
    allAccounts: [],
    state: {},
  }),
  getters: {
    getActiveAccount(): String {
      return this.id || Persistent.getLocal(ACTIVE_ACCOUNTS_KEY) || '';
    },
  },
  actions: {
    setActiveAccountId(aac: string) {
      console.log(aac);
      this.id = aac;
      Persistent.setLocal(ACTIVE_ACCOUNTS_KEY, aac);
    },
    async setAccountState(data: any) {
      this.state = data;
    },
    loadAll() {
      getAccounts().then((res) => {
        this.allAccounts = res;
      });
    },
    async resetAllState() {
      Persistent.clearAll();
    },
  },
});

export function useAccountsStoreWithOut() {
  return useAccountsStore(store);
}
