import axios from "axios";
import { ICoinResponse } from "../response/coin.response";
import { IPriceResponse } from "../response/price.response";

const V1 = "https://api.coinpaprika.com/v1";

export async function getCoins() {
  const response = await axios.get(`${V1}/coins`);
  return response.data as ICoinResponse[];
}

export async function getCoin(coinId: string) {
  const response = await axios.get(`${V1}/coins/${coinId}`);
  return response.data as ICoinResponse;
}

export async function getPrice(coinId: string) {
  const response = await axios.get(`${V1}/tickers/${coinId}`);
  return response.data as IPriceResponse;
}
