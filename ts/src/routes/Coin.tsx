import { useParams } from "react-router-dom";

interface CoinRouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<CoinRouteParams>();

  return <h1>Coin {coinId}</h1>;
}

export default Coin;
