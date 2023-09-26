import styled from "styled-components";

const Father = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input.attrs({
  required: true,
  minLength: 10,
  maxLength: 20,
})`
  background-color: tomato;
`;

export const App = () => {
  return (
    <Father as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input as="a" href="/">
        This is an A
      </Input>
    </Father>
  );
};
