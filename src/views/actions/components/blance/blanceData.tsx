import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '现货余额',
      dataIndex: 'spotBalance',
    },
    {
      title: '现货可用',
      dataIndex: 'spotAvailable',
    },
    {
      title: '合约余额',
      dataIndex: 'contractBalance',
    },
    {
      title: '合约可用',
      dataIndex: 'contractAvailable',
    },
  ];
}

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 1; index++) {
      arr.push({
        spotBalance: Math.random() * 1000,
        spotAvailable: Math.random() * 1000,
        contractBalance: Math.random() * 1000,
        contractAvailable: Math.random() * 1000,
      });
    }
    return arr;
  })();
}
