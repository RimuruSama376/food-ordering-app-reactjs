import React, { useState, useContext, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [currClassState, setCurrClassState] = useState(false);
  const numberOfCartItems = cartCtx.items.reduce(
    (curr, ele) => curr + ele.amount,
    0
  );
  const btnClasses = `${classes.button} ${currClassState ? classes.bump : ""}`;

  useEffect(() => {
    if (numberOfCartItems === 0) {
      return;
    }
    setCurrClassState(true);

    const timer = setTimeout(() => {
      setCurrClassState(false);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [numberOfCartItems]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
