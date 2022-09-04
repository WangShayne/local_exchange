// export interface StatesParams {

// }

// {
//   "type": "state",
//   "id": "5b9515a7e40941a195e5e8cc1c011656",
//   "name": "abc",
//   "dualSide": false,
//   "apiKey": "dhbjERy7jlwxBiJGu4d2kfzc04h9tcHKTk8ngsZJO2dDQKCzUiDQueNH9LAhVra4",
//   "balance": 20.47961631,
//   "available": 20.47961631,
//   "spotBalance": 13.01352206,
//   "spotAvailable": 13.01352206,
//   "failList": [],
//   "timestamp": 1661959278484,
//   "positionStr": "",
//   "positionList": [],
//   "orderList": [],
//   "symbolQuantity": []
// },

export interface StatesParams {
  id?: string;
}

export interface StatesResultModel {
  type?: string;
  id?: string;
  name?: string;
  dualSide?: boolean;
  apiKeys?: string;
  balance?: number;
  available?: number;
  spotBalance?: number;
  spotAvailable?: number;
  failList?: any[];
  timestamp?: number;
  positionStr?: string;
  positionList?: any[];
  orderList?: any[];
  symbolQuantity?: any[];
}
