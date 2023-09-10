import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const onChange = (event) => setToDo(event.target.value);

  const [toDos, setToDos] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (toDo.length < 1) {
      return;
    }

    setToDos((prev) => [toDo, ...prev]);
    setToDo("");
  };

  return (
    <div>
      <h1>My To Do ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write what to do"
        />

        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
