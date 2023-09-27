import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 36px;

    &:hover {
      font-size: 100px;
    }

    &:active {
      opacity: 0;
    }

    user-select: none;
  }
`;

export const App = () => {
  return (
    <Wrapper>
      <Box>
        <span>🤭</span>
      </Box>
    </Wrapper>
  );
};
