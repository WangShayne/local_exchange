import { defHttp } from '/@/utils/http/axios';
import { DualSideParams } from './model/changeModel';

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
