import { useState } from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.textColor};
  border-radius: 50px;
`;

function App() {
  const [value, setValue] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("On Submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="user name"
        />

        <Circle />

        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
