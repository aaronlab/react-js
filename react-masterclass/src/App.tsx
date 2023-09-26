import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
`;

const Box = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
  font-size: 24px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

export const App = () => {
  return (
    <MainWrapper>
      <Box bgColor="teal">
        <Text>Hello</Text>
      </Box>
      <Circle bgColor="tomato">
        <Text>World!</Text>
      </Circle>
    </MainWrapper>
  );
};
