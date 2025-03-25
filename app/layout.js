import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import NotificationContainer from "@/components/ui/NotificationContainer";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import NavBar from "@/layout/NavBar";
import Footer from "@/layout/Footer";


const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gourmet Haven Restaurant",
  description: "Experience fine dining at Gourmet Haven - where culinary excellence meets exceptional service. Discover our carefully curated menu featuring fresh, locally-sourced ingredients and innovative dishes crafted by our expert chefs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <NavBar/>
        <main>
          {children}
          <NotificationContainer/>
          <ScrollToTopButton/>
        </main>
        <Footer/>
      </body>
    </html>
  );
}