import { Search } from "lucide-react";
import { Button } from "../ui/button";

export function CommandMenu() {
  return (
    <>
      <Button
        disabled
        variant="outline"
        className={
          "relative hidden h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:inline-flex sm:pr-12"
        }
      >
        <span>Search is disabled yet...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        disabled
        size="icon"
        variant={"outline"}
        className="inline-flex sm:hidden"
      >
        <Search size={16} />
      </Button>
    </>
  );
}
