import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cart";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bazar.com",
  description: "Generated by Shaiadul Bashar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
