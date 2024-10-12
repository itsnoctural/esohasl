import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

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
