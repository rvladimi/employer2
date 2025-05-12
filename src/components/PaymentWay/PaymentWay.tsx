import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, type DataContextType } from "../common.tsx";
import classes from "./PaymentWay.module.css";

export function PaymentWay() {
  const { data } = useContext(DataContext) as DataContextType;
  const navigate = useNavigate();
  const param = useParams();
  const id = Number(param.id);
  const orderDetails = data?.find((item) => item.id === id);

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
        </div>

        <div className={classes.main}>
          {orderDetails?.name && orderDetails?.price && (
            <div className={classes.info}>
              <div className={classes.order_header}>Ваш заказ:</div>
              <div className={classes.order_info}>
                {orderDetails?.name}, цена {orderDetails?.price} руб
              </div>
              <div className={classes.order_header}>Способ оплаты:</div>
            </div>
          )}
          <div className={classes.order_buttons}>
            <button
              className={classes.button}
              onClick={() => {
                navigate(`/card/${id}`);
              }}
            >
              Банковская карта
            </button>
            <button
              className={classes.button}
              onClick={() => {
                navigate(`/cash/${id}`);
              }}
            >
              Наличные
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
