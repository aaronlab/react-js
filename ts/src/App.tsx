import Router from "./Router";
import Reset from "./Reset";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <Reset />
      <Router />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
