import Router from "./Router";
import Reset from "./Reset";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((current) => !current);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Reset />
        <Router toggleDark={toggleTheme} isDark={isDark} />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;
