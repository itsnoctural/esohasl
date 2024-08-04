"use client";

import { useContext } from "react";
import { ChipGroupContext } from "./chip-group.context";

export function Chip({ value }: { value: string; onSelect?: () => void }) {
  const { select, setSelect, onSelect } = useContext(ChipGroupContext);

  function run() {
    if (select === value) return;
    onSelect?.(value);
    setSelect(value);
  }

  return (
    <button
      type="button"
      data-state={select === value ? "on" : "off"}
      className="h-8 rounded-md bg-secondary px-3 transition-colors disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      onClick={() => run()}
    >
      {value}
    </button>
  );
}
