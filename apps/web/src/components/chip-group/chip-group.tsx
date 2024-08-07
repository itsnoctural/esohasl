"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
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

  const ref = useRef<HTMLDivElement>(null);
  const [leftVisibility, setLeftVisibility] = useState(false);
  const [rightVisibility, setRightVisibility] = useState(true);

  function onScroll(x: number) {
    if (ref.current) {
      const maxScroll = ref.current.scrollWidth - ref.current.clientWidth;

      ref.current.scrollLeft += x;

      console.log(maxScroll);

      setLeftVisibility(ref.current.scrollLeft + x > 0);
      setRightVisibility(ref.current.scrollLeft + x < maxScroll);
    }
  }

  return (
    <ChipGroupContext.Provider value={{ select, setSelect, onSelect }}>
      <nav className="relative my-3 flex items-center">
        <div
          data-visible={leftVisibility}
          className="absolute -left-3 hidden after:w-6 after:bg-gradient-to-r after:from-background after:from-20% after:to-[rgba(255,255,255,0)] after:to-80% after:content-[''] data-[visible=true]:flex"
        >
          <button
            type="button"
            className="h-full w-8 bg-background"
            onClick={() => onScroll(-175)}
            aria-label="Previous categories"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
        </div>

        <div
          className={
            "text-bold inline-flex w-full gap-x-3 overflow-hidden scroll-smooth text-nowrap font-medium"
          }
          ref={ref}
        >
          <Chip value={defaultValue} />
          {children}
        </div>
        <div
          data-visible={rightVisibility}
          className="absolute -right-3 hidden before:w-6 before:bg-gradient-to-l before:from-background before:from-20% before:to-[rgba(255,255,255,0)] before:to-80% before:content-[''] data-[visible=true]:flex"
        >
          <button
            type="button"
            className="h-full w-8 bg-background"
            onClick={() => onScroll(175)}
            aria-label="Next categories"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      </nav>
    </ChipGroupContext.Provider>
  );
}
