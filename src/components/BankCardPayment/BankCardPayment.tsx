import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import classes from "./BankCardPayment.module.css";

type Action = {
  type: string;
  payload?: {
    cardProcessed?: boolean;
    connectingBank?: boolean;
    paymentSuccess?: boolean;
    cancel?: boolean;
    cancelNotification?: boolean;
  };
};

type State = {
  cardProcessed: boolean;
  connectingBank: boolean;
  paymentSuccess?: boolean;
  cancel?: boolean;
  cancelNotification?: boolean;
};

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case "cardApplied": {
      return {
        ...state,
        cardProcessed: payload?.cardProcessed
          ? payload.cardProcessed
          : state.cardProcessed,
      };
    }
    case "connectingBank": {
      return {
        ...state,
        cardProcessed: payload?.cardProcessed
          ? payload.cardProcessed
          : state.cardProcessed,
        connectingBank: payload?.connectingBank
          ? payload.connectingBank
          : state.connectingBank,
      };
    }
    case "finish": {
      return {
        ...state,
        connectingBank: payload?.connectingBank
          ? payload.connectingBank
          : state.connectingBank,
        paymentSuccess: payload?.paymentSuccess
          ? payload.paymentSuccess
          : state.paymentSuccess,
      };
    }
    case "cancel": {
      return {
        ...state,
        cancel: payload?.cancel ? payload.cancel : state.cancel,
      };
    }
    case "notify": {
      return {
        ...state,
        cancelNotification: payload?.cancelNotification
          ? payload.cancelNotification
          : state.cancelNotification,
      };
    }
    default:
      return { ...state };
  }
};

export function BankCardPayment() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const init: State = {
    cardProcessed: false,
    connectingBank: false,
    paymentSuccess: false,
    cancel: false,
    cancelNotification: false,
  };

  const [state, dispatch] = useReducer(reducer, init);

  useEffect(() => {
    const set = new Set();
    const handleKeysDown = (event: KeyboardEvent) => {
      // Эмуляция прикладывания карты производится нажатием клавиш m l
      if (event.code == "KeyM") {
        set.add(event.code);
      }
      if (event.code == "KeyL") {
        if (set.has("KeyM")) {
          set.delete("KeyM");
          const action = {
            type: "cardApplied",
            payload: {
              cardProcessed: true,
            },
          };
          dispatch(action);
        }
      }
      // эмуляция перехода к приготовлению заказа -
      // одновременное нажатие клавиш m j
      if (event.code == "KeyJ") {
        if (set.has("KeyM")) {
          set.delete("KeyM");
          navigate(`/preparation/${id}`);
        }
      }
    };

    document.addEventListener("keydown", handleKeysDown);
    return () => {
      document.removeEventListener("keydown", handleKeysDown);
    };
  }, []);

  useEffect(() => {
    if (state.cardProcessed) {
      const timer = setTimeout(() => {
        const action = {
          type: "connectingBank",
          payload: {
            cardProcessed: false,
            connectingBank: true,
          },
        };
        dispatch(action);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.cardProcessed]);

  useEffect(() => {
    if (state.connectingBank) {
      const timer = setTimeout(() => {
        const action = {
          type: "finish",
          payload: {
            connectingBank: false,
            paymentSuccess: true,
          },
        };
        dispatch(action);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.connectingBank]);

  // Сигнал об отмене операции (state.cancel) может поступить в любой момент,
  // но сигнал показывать сообщение об отмене (state.cancelNotification)
  // может появиться только после успешного завершения транзакции с банком
  useEffect(() => {
    if (state.paymentSuccess && state.cancel) {
      const action = {
        type: "notify",
        payload: {
          cancelNotification: true,
        },
      };
      dispatch(action);
    }
  }, [state.paymentSuccess, state.cancel]);

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
          {!state.cardProcessed && (
            <>
              <div className={classes.header}>
                <div>Приложите карту</div> <div>к терминалу</div>{" "}
                <div className={classes.comment}>
                  эмуляция прикладывания карты - одновременное нажатие клавиш m
                  l
                </div>
              </div>
              <div className={classes.image_container}>
                <img src={`/images/bank_card.png`} alt="bank card pic" />
              </div>
            </>
          )}

          {state.cardProcessed && !state.connectingBank && (
            <>
              <div className={classes.header}>обработка карты</div>
              <div className={classes.activity_indicator}>
                <Dots />
              </div>
            </>
          )}

          {state.connectingBank && !state.paymentSuccess && (
            <>
              <div className={classes.header}>связь с банком</div>
              <div className={classes.activity_indicator}>
                <Dots />
              </div>
            </>
          )}

          {state.paymentSuccess && !state.cancel && (
            <>
              <div className={classes.header}>оплата произведена</div>
              <div className={classes.comment}>
                эмуляция перехода к приготовлению заказа - одновременное нажатие
                клавиш m j
              </div>
            </>
          )}

          {state.cancelNotification && (
            <>
              <div className={classes.header}>операция отменена</div>
            </>
          )}
        </div>
        {state.cardProcessed && (
          <button
            className={classes.button}
            onClick={() => {
              const action = {
                type: "cancel",
                payload: {
                  cancel: true,
                },
              };
              dispatch(action);
            }}
          >
            Отмена
          </button>
        )}
      </div>
    </>
  );
}
