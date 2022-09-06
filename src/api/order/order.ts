import { defHttp } from '/@/utils/http/axios';
import { OrderParams, QuantityParams, QuantityResultModel } from './model/orderModel';
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
      url: Api.account + `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/order`,
      params,
    },
    { errorMessageMode: mode },
  );
}

export function getQuantity(params: QuantityParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<QuantityResultModel[]>(
    {
      url: Api.account + `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/quantity`,
      params,
    },
    { errorMessageMode: mode },
  );
}

// 取消订单
export function cancelOrder(params: OrderParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete(
    {
      url:
        Api.account +
        `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/order/${params.orderId}`,
      params,
    },
    { errorMessageMode: mode },
  );
}

// 平仓
export function closePosition(params: OrderParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.account + `/${params.id}/symbol/${symbolToUpCase(params.symbol as string)}/position`,
      params,
    },
    { errorMessageMode: mode },
  );
}
