"use client";

import { useState } from "react";
import { Chip } from "./chip";
import { ChipGroupContext } from "./chip-group.context";

export function ChipGroup({
  children,
  defaultValue,
  onSelect = () => {},
}: {
  children: React.ReactNode;
  defaultValue: string;
  onSelect?(value: string): void;
}) {
  const [select, setSelect] = useState(defaultValue);

  return (
    <ChipGroupContext.Provider value={{ select, setSelect, onSelect }}>
      <div
        className={
          "text-bold my-3 inline-flex w-full gap-x-3 overflow-hidden scroll-smooth text-nowrap font-medium"
        }
      >
        <Chip value={defaultValue} />
        {children}
      </div>
    </ChipGroupContext.Provider>
  );
}
