import { BasicParams } from '../../model/baseModel';

export interface OrderParams {
  id?: string;
  symbol?: string;
  orderType?: string;
  tradeSide?: string;
  quantity?: number;
  price?: number;
  isOpen?: boolean;
  orderId?: string;
}

export interface QuantityParams extends BasicParams {
  percent?: number;
  tradeSide?: string;
  price?: number;
}

/**
 * {
            "symbol": "ETHUSDT",
            "tradeSide": "BUY",
            "price": 1565.79,
            "percent": 1,
            "quantity": 0.002,
            "timestamp": 1662367321122
        },
 */
export interface QuantityResultModel {
  symbol?: string;
  tradeSide?: string;
  price?: number;
  percent?: number;
  quantity?: number;
  timestamp?: number;
}

// export interface OrderResultModel {}
