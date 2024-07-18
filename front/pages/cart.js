import { CartTable } from "@/components/modules/CartTable";
import { cartContext } from "@/context/CartContext";
import React, { useContext, useEffect, useState } from "react";

const Cart = () => {
  const { cartProducts } = useContext(cartContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchproduct = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ id: cartProducts }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    setCartItems(result);
  };

  const productCount = (id) => {
    const filtered = cartProducts.filter((ids) => ids === id).length;
    return filtered;
  };

  console.log(cartItems);

  useEffect(() => {
    fetchproduct();
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-2 mt-5">
      {!cartProducts.length && (
        <div className="w-full shadow-lg rounded-xl p-5">
          <div className="text-center font-bold text-slate-700">
            Your Cart is Empty
          </div>
        </div>
      )}
      <div>
        {cartItems.length > 0 &&
          cartItems.map((cart) => (
            <div key={cart._id}>
             <CartTable />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;

// export async function getServerSideProps(){
//   const product = await Product.findOne({_id :})
//   return {
//     props : {
//       data :product
//     }
//   }
// }
