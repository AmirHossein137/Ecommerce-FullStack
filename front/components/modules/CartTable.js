import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useContext } from "react";
import { cartContext } from "@/context/CartContext";

export function CartTable({ cartItems, productCount , total }) {

  const { addProduct , Decrement } = useContext(cartContext)
 
  const Increment = (id) => {
    addProduct(id)
  }


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.length > 0 &&
          cartItems.map((cart) => (
            <TableRow key={cart._id}>
              <TableCell className="font-medium w-[400px]">
                {cart.title}
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-4">
                  <Button onClick={() => Decrement(cart._id)} className="bg-blue-800">-</Button>
                  {productCount(cart._id)}
                  <Button onClick={() => Increment(cart._id)} className="bg-blue-800">+</Button>
                </div>
              </TableCell>
              <TableCell className="font-medium">${productCount(cart._id) * cart.price}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
