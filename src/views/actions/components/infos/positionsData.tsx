import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '交易对',
      dataIndex: 'symbol',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
  ];
}

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 100; index++) {
      arr.push({
        symbol: Math.random() * 1 > 0.5 ? 'BTC/USDT' : 'ETH/USDT',
        quantity: Math.random() * 1000,
        price: Math.random() * 1000,
      });
    }
    return arr;
  })();
}
