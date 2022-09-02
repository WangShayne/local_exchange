import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '交易对',
      dataIndex: 'C2C',
    },
    {
      title: '数量',
      dataIndex: 'amount',
    },
  ];
}

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 100; index++) {
      arr.push({
        C2C: Math.random() * 1 > 0.5 ? 'BTC/USDT' : 'ETH/USDT',
        amount: Math.random() * 1000,
      });
    }
    return arr;
  })();
}
