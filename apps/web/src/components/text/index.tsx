export function TextContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}

export function TextContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-left text-muted-foreground lg:text-lg">{children}</p>
  );
}

export function TextTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-xl font-semibold lg:text-3xl">{children}</h1>;
}
