import styled, { keyframes } from "styled-components";

type ThemePropsType = {
  theme: {
    textColor: string;
    backgroundColor: string;
  };
};

const Wrapper = styled.div<ThemePropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  flex-direction: column;
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

const Emoji = styled.span<ThemePropsType>`
  font-size: 36px;

  &:active {
    opacity: 0;
  }

  user-select: none;

  color: ${(props) => props.theme.textColor};
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Emoji}:hover {
    font-size: 100px;
  }
`;

export const App = () => {
  return (
    <Wrapper>
      <Box>
        <Emoji>🤭</Emoji>
      </Box>
      <Box>
        <Emoji>Hello!</Emoji>
      </Box>
    </Wrapper>
  );
};
