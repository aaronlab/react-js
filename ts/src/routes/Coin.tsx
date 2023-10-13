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
import Price from "./Price";
import Chart from "./Chart";
import { useQueries } from "@tanstack/react-query";
import { getCoin, getPrice } from "../core/api";
import { useEffect } from "react";
import { useTitle } from "../hooks/useTitle";
import setTitle from "../utils/setTitle";

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
  const { state } = useLocation<ICoinRouteState>();

  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");

  const [
    { isLoading: isInfoLoading, data: coin },
    { isLoading: isPriceLoading, data: price },
  ] = useQueries({
    queries: [
      {
        queryKey: ["info", coinId],
        queryFn: () => getCoin(coinId),
      },
      {
        queryKey: ["price", coinId],
        queryFn: () => getPrice(coinId),
      },
    ],
  });

  useTitle("Coin");

  useEffect(() => {
    setTitle(state?.coin?.name ?? coin?.name ?? "Coin");
  }, [coin]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.coin?.name
            ? state.coin.name
            : isInfoLoading
            ? "Loading..."
            : coin?.name ?? ""}
        </Title>
      </Header>
      {isPriceLoading ? (
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
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
