import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { CartContextProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </CartContextProvider>
  );
}
