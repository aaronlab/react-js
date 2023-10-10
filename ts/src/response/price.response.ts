import { IQuoteResponse } from "./quote.response";

export interface IPriceResponse {
  id: string;
  name?: string;
  symbol?: string;
  rank?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  beta_value?: number;
  first_data_at?: string;
  last_updated?: string;
  quotes?: {
    USD: IQuoteResponse;
  };
}
