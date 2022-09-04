export interface DualSideParams {
  id?: string;
  dualSide?: boolean;
}

export interface ConfigParams {
  id?: string;
  symbol?: string;
  leverage?: number;
  marginType?: string;
}

export interface ConfigResultModel {
  id?: string;
  leverage?: number;
  marginType?: string;
}

// export interface DualSideResultModel {
//   id?: string;
//   tarder_id?: string;
//   name?: string;
//   api_key?: string;
//   secret_key?: string;
// }
