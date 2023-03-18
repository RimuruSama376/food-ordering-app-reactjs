import React from "react";
import classes from "./Header.module.css";
import mealsImge from "../../assests/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImge} alt="A table full of delicious Food!" />
      </div>
    </>
  );
};

export default Header;
