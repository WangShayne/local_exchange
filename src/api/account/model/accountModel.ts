export interface AccountParams {
  id?: string;
  tarder_id?: string;
  name: string;
  apiKey: string;
  secretKey: string;
}

export interface AccountResultModel {
  id?: string;
  tarder_id?: string;
  name?: string;
  api_key?: string;
  secret_key?: string;
}
