import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, ...props }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Provider>{children}</Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
