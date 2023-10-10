import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { ICoinResponse } from "../response/coin.response";
import axios from "axios";
import { IPriceResponse } from "../response/price.response";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 760px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
  display: block;
`;

interface ICoinRouteParams {
  coinId: string;
}

interface ICoinRouteState {
  coin?: ICoinResponse | undefined;
}

function Coin() {
  const { coinId } = useParams<ICoinRouteParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useLocation<ICoinRouteState>();
  const [coin, setCoin] = useState<ICoinResponse>();
  const [price, setPrice] = useState<IPriceResponse>();

  useEffect(() => {
    (async () => {
      const [coinResponse, tickerResponse] = await Promise.all([
        axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`),
        axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`),
      ]);

      setCoin(coinResponse.data);
      setPrice(tickerResponse.data);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.coin?.name ?? coin?.name ?? "Loading..."}</Title>
      </Header>
      {loading ? (
        <Loader>Loding...</Loader>
      ) : (
        `${(price?.quotes?.USD.price ?? 0).toLocaleString()} USD`
      )}
    </Container>
  );
}

export default Coin;
