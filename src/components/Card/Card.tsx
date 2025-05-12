import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  CurrentObjectIdContext,
  type CurrentObjectIdContextType,
} from "../common.tsx";
import classes from "./Card.module.css";

type CardProps = {
  id: number;
  image: string;
  name: string;
  price: number;
};

export function Card({ id, image, name, price }: CardProps) {
  const navigate = useNavigate();
  const { setCurrentObjectId } = useContext(
    CurrentObjectIdContext
  ) as CurrentObjectIdContextType;

  return (
    <div
      className={classes.card}
      onClick={() => {
        setCurrentObjectId(id);
        navigate(`/payment/${id}`);
      }}
    >
      <div className={classes.image_wrapper}>
        <img src={`/images/${image}`} />
      </div>
      <div className={classes.card_info}>
        <div className={classes.name}>{name}</div>
        <div>
          <span className={classes.price_text}>от</span>{" "}
          <span className={classes.price}>{price}</span>{" "}
          <span className={classes.ruble}>&#8381;</span>
        </div>
      </div>
    </div>
  );
}
