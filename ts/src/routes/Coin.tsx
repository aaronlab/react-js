import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { ICoinResponse } from "../response/coin.response";
import axios from "axios";
import { IPriceResponse } from "../response/price.response";
import Price from "./Price";
import Chart from "./Chart";

interface ICoinRouteParams {
  coinId: string;
}

interface ICoinRouteState {
  coin?: ICoinResponse | undefined;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 760px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.secondaryBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 20px;
  }

  span:first-child {
    font-size: 18px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.secondaryBgColor};
  padding: 8px 0px;
  border-radius: 8px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams<ICoinRouteParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useLocation<ICoinRouteState>();
  const [coin, setCoin] = useState<ICoinResponse>();
  const [price, setPrice] = useState<IPriceResponse>();
  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [coinResponse, tickerResponse] = await Promise.all([
        axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`),
        axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`),
      ]);

      setCoin(coinResponse.data);
      setPrice(tickerResponse.data);

      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.coin?.name
            ? state.coin.name
            : loading
            ? "Loading..."
            : coin?.name ?? ""}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loding...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank: </span>
              <span>{coin?.rank?.toLocaleString() ?? ""}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Symbol: </span>
              <span>{coin?.symbol ?? ""}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Open Source: </span>
              <span>{coin?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>

          <Description>{coin?.description ?? ""}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Suply: </span>
              <span>{price?.total_supply?.toLocaleString() ?? ""}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Max Supply: </span>
              <span>{price?.max_supply?.toLocaleString() ?? ""}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={"/:coinId/price"}>
              <Price />
            </Route>
            <Route path={"/:coinId/chart"}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
