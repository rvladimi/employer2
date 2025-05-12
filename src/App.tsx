import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "./components/Home/Home";
import { PaymentWay } from "./components/PaymentWay/PaymentWay";
import { BankCardPayment } from "./components/BankCardPayment/BankCardPayment";
import { Preparation } from "./components/Preparation/Preparation.tsx";
import { BankCashPayment } from "./components/BankCashPayment/BankCashPayment";
import {
  DataContext,
  type CoffeeDrink,
  rawData,
} from "./components/common.tsx";
//import "./App.css";

export function App() {
  const [data, setData] = useState<CoffeeDrink[] | null>(null);

  useEffect(() => {
    (async () => {
      setData(rawData);
    })();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment/:id" element={<PaymentWay />} />
          <Route path="/card/:id" element={<BankCardPayment />} />
          <Route path="/preparation/:id" element={<Preparation />} />
          <Route path="/cash/:id" element={<BankCashPayment />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}
