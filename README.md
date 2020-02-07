This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Walkthrough

- Bootstrap the project

- Add styled components `npm install --save styled-components`

- Delete boilerplate

- Import styled components into App.js `import styled from "styled-components";`

- Create an app background, this also helps us center everything

```
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
  return (
    <AppBackground>
      <AppWrapper>
        <Title>My Shopping List</Title>
        <AddItemInput placeholder="Add an item..." />
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

```

- lets update with some real data (add extra row to show how "data & presentation" are seperated. Explain the map very well, and key)

```

  const [items, setItems] = useState([
    { itemName: "item 1", quanitiy: 1 },
    { itemName: "item 2", quanitiy: 2 },
    { itemName: "item 3", quanitiy: 3 }
  ]);

  return (
    <AppBackground>
      <AppWrapper>
        <Title>My Shopping List</Title>
        <AddItemInput
          placeholder="Add an item..."
        />
        <ItemList>
          {items.map((item, index) => (
            <Item key={`item_${index}`}>
              <div>{item.itemName}</div>
              <ItemActionButtons>
                <button>-</button>
                <div>{item.quanitiy}</div>
                <button>+</button>
                <RemoveButton>x</RemoveButton>
              </ItemActionButtons>
            </Item>
          ))}
        </ItemList>
        <hr />
        <Total>Total: 6</Total>
      </AppWrapper>
    </AppBackground>
  );
};

```

- Add state object to hold value of the add new item:

```
  const [addItemInputValue, setAddItemInputValue] = useState("");
```

- Handle the change and set the value of our input (use console.log to show things updating)

```
  <AddItemInput placeholder="Add an item..." value={value} onChange={e => setValue(e.target.value)}/>
```

- When the input is on focus and enter is pressed, we want to update the list

```
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('enter pressed!');
    }
  }
```

```
<AddItemInput placeholder="Add an item..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => handleKeyDown(e)}/>
```

- Next add the logic to update the state. Create an object based on the state value (input), default the quantity to one.
- Use the spread operator to copy the array, and add our new object to it (IMMUTIBILITY)
- Reset the inputvalue (test adding items quickly)

```
  const [items, setItems] = useState([]);

  const addNewItem = () => {
  const newItem = {
    itemName: addItemInputValue,
    quanitiy: 1,
  };

  const newItems = [...items, newItem]
  setItems(newItems);
  setAddItemInputValue("");
}

```

- We want to make sure that the user cannot enter an item that is already on the list:
- update the "addNewItem" function to check if the item exists in state already:
- Explain filter and what it returns

```
    const doesItemExist = items.filter(
      item => item.itemName === addItemInputValue
    );
```

- check if the `doesItemExist` array has a value or not. If not, go ahead and add to list. If yes, then simply log a message

```
    // only add the item if if doesn't exist already
    if (doesItemExist.length > 0) {
      console.log("Item already added to list!");
    } else {
      const newItem = {
        itemName: addItemInputValue,
        quanitiy: 1
      };

      const newItems = [...items, newItem];
      setItems(newItems);
      setAddItemInputValue("");
    }
  };
```

- Next, we'll look at updating the quantities for each item. Add a click listener, passing in the item name we are working on

```
  <button onClick={e => decrementItemQuantity(item.itemName)}>-</butto
```

- update the array, making sure to not mutate

```
  const decrementItemQuantity = (itemName) => {
    // copy array to avoid mutating state
    const newItems = [...items];

    // get the index of item by its name
    const itemIndex = newItems.findIndex((item => item.itemName === itemName));

    // use the index to get the item from the array, and decrement the quantity
    newItems[itemIndex].quantity--;

    setItems(newItems);
  }
```

- do the same with increment

```
  const incrementItemQuantity = itemName => {
    // copy array to avoid mutating state
    const newItems = [...items];

    // get the index of item by its name
    const itemIndex = newItems.findIndex(item => item.itemName === itemName);

    // use the index to get the item from the array, and decrement the quantity
    newItems[itemIndex].quantity++;

    setItems(newItems);
  };
```

- Looks good, but we can decrement below 0, so let's fix that. Add a check to the decrement method.
- Only decrement if it's greater than 0

```
    // use the index to get the item from the array, and decrement the quantity - as long as quantity is > 0
    if(newItems[itemIndex].quantity > 0) {
      newItems[itemIndex].quantity--;

      setItems(newItems);
    }
```

- Now let's delete an item
- We can use the item Index which we get from the map, and simply remove this index from the array
- add the listener

```
  <RemoveButton onClick={() => deleteItem(index)}>x</RemoveButton>
```

- copy the array
- use splice to remove the item at index from the array
- set items

```
  const deleteItem = (itemIndex) => {
    const newItems = [...items];
    newItems.splice(itemIndex, 1);

    setItems(newItems);
  }
```

- now let's deal with the total
- We want to update the total when something changes
- We could have an "update total" function that is called, by we have to update alot of methods and it can be easy to forget in future
- Another option is useEffect. This runs when something changes
- When our `items` state changes, we want to update the total

- set a state for the total

```
  const [totalCount, setTotalCount] = useState(0)
```

- add this to our JSX

```
  <Total>Total: {totalItemCount}</Total>
```

- setup our useEffect function. Second param means this runs when the items array changes

```
  useEffect(() => {

  }, [items]);
```

- use the reduce method to get a sum of the totals quantities

```
  const totalItemCount = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
```
