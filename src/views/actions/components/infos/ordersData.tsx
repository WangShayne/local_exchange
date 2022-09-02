import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '方向',
      dataIndex: 'direction',
    },
    {
      title: '价格',
      dataIndex: 'price',
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
        type: Math.random() * 1 > 0.5 ? '限价' : '市价',
        direction: Math.random() * 1 > 0.5 ? '买入' : '卖出',
        price: Math.random() * 1000,
        amount: Math.random() * 1000,
      });
    }
    return arr;
  })();
}
