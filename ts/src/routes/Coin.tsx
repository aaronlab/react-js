import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { CoinResponse } from "../response/coin.response";

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

interface CoinRouteParams {
  coinId: string;
}

interface CoinRouteState {
  coin?: CoinResponse | undefined;
}

function Coin() {
  const { coinId } = useParams<CoinRouteParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useLocation<CoinRouteState>();

  return (
    <Container>
      <Header>
        <Title>{state?.coin?.name ?? "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loding...</Loader> : null}
    </Container>
  );
}

export default Coin;
