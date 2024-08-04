import { createContext } from "react";

export const ChipGroupContext = createContext({
  select: "All",
  setSelect: (value: string) => {},
  onSelect: (value: string) => {},
});
