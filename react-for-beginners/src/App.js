import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => (prev += 1));

  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);

  console.log("App rendered");

  useEffect(() => {
    console.log("Call the API");
  }, []);

  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("Search FOR", keyword);
    }
  }, [keyword]);

  useEffect(() => {
    console.log("Counter changed", counter);
  }, [counter]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here"
      />

      <h1 className={styles.title}>Welcome back!</h1>

      <p>{counter}</p>

      <Button text={"Click Me"} onClick={onClick} />
    </div>
  );
}

export default App;
