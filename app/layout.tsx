import Navigation from "./components/Navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="simple-pastel-bg min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
