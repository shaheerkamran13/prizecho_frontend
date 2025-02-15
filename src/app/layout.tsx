import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: "Prizecho ",
  description: "A complete e-commerce application with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Navbar/>
        {children}
        <ToastContainer />
        <Footer/>
      </body>
    </html>
  );
}
