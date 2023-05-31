import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-c02a2-default-rtdb.asia-southeast1.firebasedatabase.app//meals.json"
      );

      if (!response.ok) {
        setIsLoading(false);
        setHasError(true);
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    try {
      fetchMeals();
    } catch (error) {}
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>....loading</p>
      </section>
    );
  }
  if (hasError) {
    return (
      <section>
        <p>....Something went wrong</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      item={meal}
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
