import { defHttp } from '/@/utils/http/axios';
import { OrderParams } from './model/orderModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  account = '/account',
}

/**
 *   id?: string;  // 账户id
    symbol?: boolean; // 交易对
    orderType?: string; // 订单类型  限价:LIMIT  市价:MARKET
    tradeSide?: string; // 交易方向  买:BUY  卖:SELL
    quantity?: number; // 数量 
    price?: number; // 价格
    isOpen?: boolean; // 是否开仓
 */

const symbolToUpCase = (symbol: string) => {
  return symbol.replace('/', '').toLocaleUpperCase();
};

export function postOrder(params: OrderParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.account + `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/config`,
      params,
    },
    { errorMessageMode: mode },
  );
}
