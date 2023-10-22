import Reset from "./Reset";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToDoList from "./ToDoList";

function App() {
  return (
    <>
      <Reset />
      <ReactQueryDevtools />
      <ToDoList />
    </>
  );
}

export default App;
