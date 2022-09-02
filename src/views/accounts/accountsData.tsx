import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      defaultHidden: true,
    },
    {
      title: '别名1',
      dataIndex: 'name',
    },
    {
      title: '仓位',
      dataIndex: 'positionStr',
    },
    {
      title: 'apiKey',
      dataIndex: 'apiKey',
      format: (text) => {
        return text.slice(0, 6) + '****' + text.slice(-4);
      },
    },
    {
      title: 'secretKey',
      dataIndex: 'secretKey',
      defaultHidden: true,
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
