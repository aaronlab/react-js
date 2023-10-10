import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinResponse } from "../response/coin.response";
import axios from "axios";

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
  background-color: white;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<CoinResponse[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await axios.get("https://api.coinpaprika.com/v1/coins");
      const newCoins = response.data as CoinResponse[];

      setCoins(newCoins.slice(0, 100));

      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loding...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { coin },
                }}
              >
                <Symbol
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
