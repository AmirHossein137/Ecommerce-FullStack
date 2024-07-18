import { cartContext } from "@/context/CartContext";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { cartProducts } = useContext(cartContext)
  return (
    <div className="bg-slate-800 p-4">
      <div className="w-full max-w-[1200px] mx-auto px-2 flex items-center justify-between">
        <Link href={"/"} className="text-white text-2xl">
          Ecommerce
        </Link>
        <nav className="text-gray-200 flex items-center gap-5">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>All Product</Link>
          <Link href={"/category"}>Categories</Link>
          <Link href={"/account"}>Account</Link>
          <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
