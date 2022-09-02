import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const account: AppRouteModule = {
  path: '/accounts',
  name: 'Accounts',
  component: LAYOUT,
  redirect: '/accounts/index',
  meta: {
    orderNo: 501,
    icon: 'ic:outline-settings',
    title: '账号管理',
    hideChildrenInMenu: true,
    ignoreAuth: true,
  },
  children: [
    {
      path: 'index',
      name: 'AccountPage',
      component: () => import('/@/views/accounts/index.vue'),
      meta: {
        title: '账号管理',
        icon: 'ic:outline-settings',
        hideMenu: true,
        ignoreAuth: true,
      },
    },
  ],
};

export default account;
