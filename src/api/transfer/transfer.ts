import { defHttp } from '/@/utils/http/axios';
import { TransferParams } from './model/transferModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  account = '/account',
}

// 修改交易设置
export function transferFund(params: TransferParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    { url: Api.account + `/${params.id}` + `/fund`, params },
    { errorMessageMode: mode },
  );
}
