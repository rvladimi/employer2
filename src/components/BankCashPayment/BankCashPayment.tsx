import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, type DataContextType } from "../common.tsx";
import classes from "./BankCashPayment.module.css";

export function BankCashPayment() {
  const { data } = useContext(DataContext) as DataContextType;
  const navigate = useNavigate();
  const param = useParams();
  const id = Number(param.id);
  const orderDetails = data?.find((item) => item.id === id);

  const [summ, setSumm] = useState(0);
  const [ready, setReady] = useState(false);

  // Эмуляция внесения 100 руб производится нажатием клавиш m l
  // Эмуляция внесения 10 руб производится нажатием клавиш m k
  useEffect(() => {
    const set = new Set();
    const handleKeysDown = (event: KeyboardEvent) => {
      if (event.code == "KeyM") {
        set.add(event.code);
      }
      if (event.code == "KeyL") {
        if (set.has("KeyM")) {
          setSumm((summ) => summ + 100);
          set.delete("KeyM");
        }
      }
      if (event.code == "KeyK") {
        if (set.has("KeyM")) {
          setSumm((summ) => summ + 10);
          set.delete("KeyM");
        }
      }
      if (event.code == "KeyJ") {
        if (set.has("KeyM")) {
          navigate(`/preparation/${id}`);
          set.delete("KeyM");
        }
      }
    };

    document.addEventListener("keydown", handleKeysDown);
    return () => {
      document.removeEventListener("keydown", handleKeysDown);
    };
  }, []);

  useEffect(() => {
    if (orderDetails?.price && summ >= orderDetails.price) setReady(true);
  }, [summ]);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.nav_bar}>
          <div
            className={classes.nav_button}
            onClick={() => {
              navigate(`/`);
            }}
          >
            На главную
          </div>

          <div
            className={classes.nav_button}
            onClick={() => {
              navigate(`/payment/${id}`);
            }}
          >
            Выбор способа оплаты
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.header}>
            {summ === 0 && (
              <div>внесите наличными {orderDetails?.price} руб</div>
            )}

            {orderDetails?.price && summ > 0 && summ < orderDetails.price && (
              <div>внесено {summ} руб</div>
            )}

            {orderDetails?.price && summ < orderDetails.price && (
              <>
                <div className={classes.comment}>
                  (эмуляция внесения 100 руб: m l)
                </div>
                <div className={classes.comment}>
                  (эмуляция внесения 10 руб: m k)
                </div>
              </>
            )}
            {ready && (
              <>
                <div>Заказ оплачен</div>
                <div className={classes.comment}>
                  (эмуляция перехода к приготовлению заказа: m j)
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
