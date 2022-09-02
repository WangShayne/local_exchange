import { defHttp } from '/@/utils/http/axios';
import { StatesParams, StatesResultModel } from './model/statesModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  state = '/state',
  states = '/states',
}

export function getState(param: StatesParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<StatesResultModel>(
    { url: Api.state + `/${param.id}` },
    { errorMessageMode: mode },
  );
}

export function getStates(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<StatesResultModel[]>({ url: Api.states }, { errorMessageMode: mode });
}
