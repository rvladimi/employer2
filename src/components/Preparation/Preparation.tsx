import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { DataContext, type DataContextType } from "../common.tsx";
import classes from "./Preparation.module.css";

export function Preparation() {
  const { data } = useContext(DataContext) as DataContextType;
  const navigate = useNavigate();
  const param = useParams();
  const id = Number(param.id);
  const orderDetails = data?.find((item) => item.id === id);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Эмуляция получения кофе производится нажатием клавиш m l
  useEffect(() => {
    if (ready) {
      const set = new Set();
      const handleKeysDown = (event: KeyboardEvent) => {
        if (event.code == "KeyM") {
          set.add(event.code);
        }
        if (event.code == "KeyL") {
          if (set.has("KeyM")) {
            gettingOrder();
            set.delete("KeyM");
          }
        }
      };

      document.addEventListener("keydown", handleKeysDown);
      return () => {
        document.removeEventListener("keydown", handleKeysDown);
      };
    }
  }, [ready]);

  function gettingOrder() {
    const func = () => {
      document.removeEventListener("transitionend", func);
      navigate("/");
    };
    document.addEventListener("transitionend", func);
    const picture = document.getElementById("picture");
    if (picture) picture.style.left = "400px";
  }

  return (
    <>
      <div className={classes.wrapper}>
        {!ready && (
          <>
            <div className={classes.header}>
              <div>Приготовление напитка</div>
              <div className={classes.activity_indicator}>
                <Dots />
              </div>
            </div>
          </>
        )}

        {ready && (
          <>
            <div className={classes.header}>
              <div>Получите ваш {orderDetails?.name}</div>
            </div>
            <div className={classes.comment}>эмуляция получения: m l</div>
            <div id="picture" className={classes.image_container}>
              <img src={`/images/ready.png`} alt="ready pic" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
