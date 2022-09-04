import { defHttp } from '/@/utils/http/axios';
import { AccountParams, AccountResultModel } from './model/accountModel';

type delAccountParams = Pick<AccountParams, 'id'>;
type searchAccountParams = Pick<AccountParams, 'name'>;

export interface AccountOptionsItem {
  label: string;
  value: string;
}

export interface selectParams {
  id: number | string;
}

import { ErrorMessageMode } from '/#/axios';

enum Api {
  createAccount = '/account',
  updateAccount = '/account',
  getAccoutById = '/account/',
  getAccoutByName = '/accounts',
  getAccouts = '/accounts',
  delAccount = '/account',
}

export function createAccoutApi(params: AccountParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<AccountResultModel>(
    { url: Api.createAccount, params },
    { errorMessageMode: mode },
  );
}

export function updateAccoutApi(params: AccountParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<AccountResultModel>(
    { url: Api.updateAccount + `/${params.id}`, params },
    { errorMessageMode: mode },
  );
}

export function getAccoutById(params: AccountParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<AccountResultModel>(
    { url: Api.getAccoutById, params },
    { errorMessageMode: mode },
  );
}

export function getAccoutByName(params: searchAccountParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<AccountResultModel[]>(
    { url: Api.getAccoutByName + `/${params.name}` },
    { errorMessageMode: mode },
  );
}

export function getAccoutByNameOpt(params: searchAccountParams, mode: ErrorMessageMode = 'modal') {
  if (params.name === '') {
    return defHttp.get<AccountOptionsItem[]>({ url: Api.getAccouts }, { errorMessageMode: mode });
  }
  return defHttp.get<AccountOptionsItem[]>(
    { url: Api.getAccoutByName + `/${params.name}` },
    { errorMessageMode: mode },
  );
}

export function getAccounts(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<AccountResultModel[]>({ url: Api.getAccouts }, { errorMessageMode: mode });
}

export function delAccount(params: delAccountParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<AccountResultModel>(
    { url: Api.delAccount + `/${params.id}` },
    { errorMessageMode: mode },
  );
}
