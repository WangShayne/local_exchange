import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '单向/双向',
      dataIndex: 'direction',
    },
    {
      title: '逐仓/全仓',
      dataIndex: 'marginMode',
    },
    {
      title: '杠杆',
      dataIndex: 'leverage',
    },
    {
      title: '市价可买数量',
      dataIndex: 'marketBuy',
    },
    {
      title: '市价可卖数量',
      dataIndex: 'marketSell',
    },
  ];
}

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 1; index++) {
      arr.push({
        direction: Math.random() * 1 > 0.5 ? '单向' : '双向',
        marginMode: Math.random() * 1 > 0.5 ? '逐仓' : '全仓',
        leverage: `x${Math.floor(Math.random() * 5)}`,
        marketBuy: Math.random() * 1000,
        marketSell: Math.random() * 1000,
      });
    }
    return arr;
  })();
}
