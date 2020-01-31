import React from "react";
import styled from "styled-components";

const AppBackground = styled.div`
  background-color: #7cc6fe;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const AppWrapper = styled.div`
  background-color: #fff;
  width: 450px;
  height: min-content;
  border-radius: 5px;
  box-shadow: 3px 2px 19px -6px rgba(0, 0, 0, 0.75);
  padding: 10px;
`;

const Title = styled.h3`
  text-align: center;
`

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const ItemActionButtons = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  color: white;
  background-color: red;
`;

const Total = styled.div`
  float: right;
  padding: 10px;
`;

const App = () => {
  return (
    <AppBackground>
      <AppWrapper>
        <Title>My Shopping List</Title>
        <ItemList>
          <Item>
            <div>Item 1</div>
            <ItemActionButtons>
              <button>-</button>
              <div>2</div>
              <button>+</button>
              <RemoveButton>x</RemoveButton>
            </ItemActionButtons>
          </Item>
          <Item>
            <div>Item 1</div>
            <ItemActionButtons>
            <button>-</button>
              <div>2</div>
              <button>+</button>
              <RemoveButton>x</RemoveButton>
            </ItemActionButtons>
          </Item>
          <Item>
            <div>Item 1</div>
            <ItemActionButtons>
            <button>-</button>
              <div>2</div>
              <button>+</button>
              <RemoveButton>x</RemoveButton>
            </ItemActionButtons>
          </Item>
        </ItemList>
        <hr />
        <Total>Total: 6</Total>
      </AppWrapper>
    </AppBackground>
  );
};

export default App;
