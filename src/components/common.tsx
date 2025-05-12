import { createContext } from "react";

export type CoffeeDrink = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type DataContextType = {
  data: CoffeeDrink[] | null;
  setData: (data: CoffeeDrink[] | null) => void;
};

export const DataContext = createContext<DataContextType | null>(null);

export type CurrentObjectIdContextType = {
  currentObjectId: number | null;
  setCurrentObjectId: (currentObjectId: number | null) => void;
};

export const CurrentObjectIdContext =
  createContext<CurrentObjectIdContextType | null>(null);

export const rawData: CoffeeDrink[] = [
  {
    id: 0,
    name: "Эспрессо",
    price: 80,
    image: "espresso.jpg",
  },
  {
    id: 1,
    name: "Макиато",
    price: 120,
    image: "makiato.jpg",
  },
  {
    id: 2,
    name: "Капучино",
    price: 130,
    image: "cappuccino.png",
  },
  {
    id: 3,
    name: "Латте",
    price: 130,
    image: "latte.png",
  },
];
