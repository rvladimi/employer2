import { useState, useContext } from "react";
import { DataContext, type DataContextType } from "../common.tsx";
import { Card } from "../Card/Card";
import classes from "./Home.module.css";
import { CurrentObjectIdContext } from "../common.tsx";

export function Home() {
  const { data } = useContext(DataContext) as DataContextType;
  const [currentObjectId, setCurrentObjectId] = useState<number | null>(-1);

  return (
    <>
      <CurrentObjectIdContext.Provider
        value={{ currentObjectId, setCurrentObjectId }}
      >
        <div className={classes.wrapper}>
          <div className={classes.header}>Выбери свой кофе</div>
          <div className={classes.main}>
            {data?.map((item, index) => {
              return (
                <Card
                  key={index}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
      </CurrentObjectIdContext.Provider>
    </>
  );
}
