const { createContext, useState, useEffect } = require("react");

export const cartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  function Decrement(productId){
    setCartProducts(prev => {
      const position = prev.indexOf(productId)
      if(position !== -1){
        return prev.filter((value ,index) => index !== position)
      }
      return prev;
    })
  }


  return (
    <cartContext.Provider value={{ cartProducts, setCartProducts, addProduct , Decrement }}>
      {children}
    </cartContext.Provider>
  );
}
