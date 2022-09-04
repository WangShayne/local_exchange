import { defHttp } from '/@/utils/http/axios';
import { DualSideParams } from './model/changeModel';
import { ConfigParams } from './model/changeModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  account = '/account',
}

export function setDualSide(params: DualSideParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    { url: Api.account + `/${params.id}` + `/config`, params },
    { errorMessageMode: mode },
  );
}

type getConfigParams = Pick<ConfigParams, 'id' | 'symbol'>;
type setConfigParams = Pick<ConfigParams, 'id' | 'symbol' | 'marginType' | 'leverage'>;

const symbolToUpCase = (symbol: string) => {
  return symbol.replace('/', '').toLocaleUpperCase();
};

// 获取交易设置
export function getChangeConfig(params: getConfigParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    { url: Api.account + `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/config` },
    { errorMessageMode: mode },
  );
}

export function setChangeConfig(params: setConfigParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.account + `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/config`,
      params,
    },
    { errorMessageMode: mode },
  );
}
