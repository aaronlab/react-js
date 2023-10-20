import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../core/api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../core/atoms";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.secondaryBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    transition: color 0.2s ease-in;
    padding: 20px;
    display: flex;
    align-items: center;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

const Symbol = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 16px;
`;

function Coins() {
  const { isLoading, data } = useQuery(["allCoins"], getCoins);
  const setIsDark = useSetRecoilState(isDarkAtom);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>

      <Header>
        <Title>Coins</Title>
        <button onClick={() => setIsDark((current) => !current)}>
          Toggle Mode
        </button>
      </Header>
      {isLoading ? (
        <Loader>Loding...</Loader>
      ) : (
        <CoinsList>
          {data
            ? data.slice(0, 100).map((coin) => (
                <Coin key={coin.id}>
                  <Link
                    to={{
                      pathname: `/${coin.id}/chart`,
                      state: { coin },
                    }}
                  >
                    {coin.symbol ? (
                      <Symbol
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                    ) : null}
                    {coin.name} &rarr;
                  </Link>
                </Coin>
              ))
            : null}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
