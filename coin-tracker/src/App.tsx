import React, { useEffect, useState } from "react";
import "./App.css";

type USDPrice = {
  price?: number;
};

type Quotes = {
  USD?: USDPrice;
};

type Coin = {
  id: string;
  name?: string;
  symbol?: string;
  quotes?: Quotes;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [dollar, setDollars] = useState(0);
  const [selectedCoinId, setSelectedCoinId] = useState<string | undefined>(
    undefined
  );
  const [calculatedCoin, setCalculatedCoin] = useState<number | undefined>(
    undefined
  );

  const calculateCoin = () => {
    if (dollar > 0) {
      const currentCoin = coins.find((c) => c.id === selectedCoinId);
      const exchangeRate = currentCoin?.quotes?.USD?.price;

      if (currentCoin && exchangeRate) {
        setCalculatedCoin(dollar / exchangeRate);
      } else {
        setCalculatedCoin(0);
      }
    } else {
      setCalculatedCoin(0);
    }
  };

  const onDollarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);

    if (Number.isNaN(newValue)) {
      setDollars(0);
    } else {
      setDollars(parseFloat(event.target.value));
    }

    console.log(dollar);

    calculateCoin();
  };

  const onSelectCoin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoinId(event.target.value);
    calculateCoin();
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json as Coin[]);

        if (coins.length > 0) {
          setSelectedCoinId(coins[0].id);
        }

        setLoading(false);
      });
  }, []);

  if (loading) {
    return <strong> Loading...</strong>;
  }

  return (
    <div>
      <h1>{coins.length.toLocaleString()} Coins</h1>

      <div>
        $ <input type="number" onChange={onDollarChange} />
        <p>{calculatedCoin ?? 0} conins</p>
      </div>

      <select onChange={onSelectCoin} value={selectedCoinId}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name ?? "N/A"} ({coin.symbol ?? "N/A"}) $
            {coin.quotes?.USD?.price ?? 0}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
