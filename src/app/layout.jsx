import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostProvider } from "./AppContext/Context";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";

export const metadata = {
  title: "Elversh Blog",
  description: "Elversh Blog Web Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PostProvider>
          <ToastContainer theme="dark" />

          <Navbar />
          {children}
        </PostProvider>
      </body>
    </html>
  );
}
