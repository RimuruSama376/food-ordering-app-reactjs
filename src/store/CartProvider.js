import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //if Dish doesn't exist
    const idx = state.items.findIndex((ele) => ele.id === action.item.id);
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    if (idx === -1) {
      updatedItems = state.items.concat(action.item);
    } else {
      updatedItems = state.items;
      updatedItems[idx].amount = state.items[idx].amount + action.item.amount;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const idx = state.items.findIndex((ele) => ele.id === action.id);
    const currAmount = state.items[idx].amount;
    let updatedItems;
    const updatedTotalAmount = state.totalAmount - state.items[idx].price;
    if (currAmount > 1) {
      updatedItems = state.items;
      updatedItems[idx].amount -= 1;
    } else if (currAmount === 1) {
      updatedItems = state.items.filter((ele) => ele.id !== action.id);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, setCartState] = useReducer(cartReducer, defaultCartState);
  const addItemToCart = (item) => {
    setCartState({ type: "ADD", item: item });
  };

  const removeItemFromCart = (id) => {
    setCartState({ type: "REMOVE", id: id });
  };
  const orderAllItems = () => {
    setCartState({ type: "ORDER" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    orderItems: orderAllItems,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
