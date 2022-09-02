import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const actions: AppRouteModule = {
  path: '/actions',
  name: 'Actions',
  component: LAYOUT,
  redirect: '/actions/index',
  meta: {
    orderNo: 500,
    icon: 'ic:baseline-auto-graph',
    title: '手动操作',
    hideChildrenInMenu: true,
    ignoreAuth: true,
  },
  children: [
    {
      path: 'index',
      name: 'ActionsPage',
      component: () => import('/@/views/actions/index.vue'),
      meta: {
        title: '手动操作',
        icon: 'ic:baseline-auto-graph',
        hideMenu: true,
        ignoreAuth: true,
      },
    },
  ],
};

export default actions;
