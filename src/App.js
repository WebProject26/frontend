import React, { useEffect, useState } from 'react';
import './App.css';
import Cart from './components/Cart';
import { generateOrderItem } from './data/dummydata';

const initialState = [ {item: generateOrderItem(), amount:1 }, {item: generateOrderItem(), amount:1 }, {item: generateOrderItem(), amount:1 }]
const URL="https://webproject26.herokuapp.com"

function App() {
  const [items, setItems] = useState(initialState) 
  const deleteItem = (item) => {
    const newItems = items.filter((stateItem) => stateItem.item.id !== item.id)
    setItems([...newItems])
  }  
const incrementItem = (id) => {
  const newItems = [...items]
  const index = newItems.findIndex((item)=>{
    if (item.item.id === id) {
      return true
    } else {
      return false
    }
  })
  newItems[index] = {...newItems[index], amount: newItems[index].amount + 1}
  setItems(newItems)
}

 /* useEffect(() => {
  fetch(URL + "/menu/2").then((value) => value.json()).then((value) => console.log(value))
},[]) */

const decrementItem = (id) => {
  const newItems = [...items]
  const index = newItems.findIndex((item)=>{
    if (item.item.id === id) {
      return true
    } else {
      return false
    }
  })
  newItems[index] = {...newItems[index], amount: newItems[index].amount - 1}
  setItems(newItems)

}

  return (
    <div style={{backgroundColor:"rgb(206, 205, 205)"}} >
      <Cart deleteItem={deleteItem} decrementItem={decrementItem} incrementItem={incrementItem}  items={items}/>
    </div>
  );
}

export default App;