import React, { useState, useEffect } from "react";
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
`;

const AddItemInput = styled.input`
  box-sizing: border-box;
  width: 95%;
  height: 30px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #989898;
  padding: 10px;
`;

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
  const [addItemInputValue, setAddItemInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  const [items, setItems] = useState([
    { itemName: "item 1", quantity: 1 },
    { itemName: "item 2", quantity: 2 },
    { itemName: "item 3", quantity: 3 }
  ]);

  useEffect(() => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  }, [items]);

  const addNewItem = () => {
    const doesItemExist = items.filter(
      item => item.itemName === addItemInputValue
    );

    // only add the item if if doesn't exist already
    if (doesItemExist.length > 0) {
      console.log("Item already added to list!");
    } else {
      const newItem = {
        itemName: addItemInputValue,
        quantity: 1
      };

      const newItems = [...items, newItem];
      setItems(newItems);
      setAddItemInputValue("");
    }
  };

  const deleteItem = itemIndex => {
    const newItems = [...items];
    newItems.splice(itemIndex, 1);

    setItems(newItems);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };

  const decrementItemQuantity = itemName => {
    // copy array to avoid mutating state
    const newItems = [...items];

    // get the index of item by its name
    const itemIndex = newItems.findIndex(item => item.itemName === itemName);

    // use the index to get the item from the array, and decrement the quantity - as long as quantity is > 0
    if (newItems[itemIndex].quantity > 0) {
      newItems[itemIndex].quantity--;

      setItems(newItems);
    }
  };

  const incrementItemQuantity = itemName => {
    // copy array to avoid mutating state
    const newItems = [...items];

    // get the index of item by its name
    const itemIndex = newItems.findIndex(item => item.itemName === itemName);

    // use the index to get the item from the array, and decrement the quantity
    newItems[itemIndex].quantity++;

    setItems(newItems);
  };

  return (
    <AppBackground>
      <AppWrapper>
        <Title>My Shopping List</Title>
        <AddItemInput
          placeholder="Add an item..."
          value={addItemInputValue}
          onChange={e => setAddItemInputValue(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <ItemList>
          {items.map((item, index) => (
            <Item key={`item_${index}`}>
              <div>{item.itemName}</div>
              <ItemActionButtons>
                <button onClick={e => decrementItemQuantity(item.itemName)}>
                  -
                </button>
                <div>{item.quantity}</div>
                <button onClick={e => incrementItemQuantity(item.itemName)}>
                  +
                </button>
                <RemoveButton onClick={() => deleteItem(index)}>x</RemoveButton>
              </ItemActionButtons>
            </Item>
          ))}
        </ItemList>
        <hr />
        <Total>Total: {totalItemCount}</Total>
      </AppWrapper>
    </AppBackground>
  );
};

export default App;
