import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-3">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
