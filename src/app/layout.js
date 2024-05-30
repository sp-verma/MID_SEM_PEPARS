import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PreviousPapersHub",
  description: "create by satya prakash verma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            {children}
          </main>
          <Footer />

          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
