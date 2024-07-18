import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { cartContext } from "@/context/CartContext";

const NewProducts = ({ newProduct }) => {
    const { addProduct } = useContext(cartContext);
    const addToCart = (id) => {
      addProduct(id)
    }

  return (
    <>
      <h1 className="text-2xl mb-8 font-bold text-slate-900">New Products</h1>
      <div className="grid grid-cols-12 gap-4">
        {newProduct?.map((product) => (
          <div className="col-span-4">
            <Card className="rounded-lg">
              <CardContent>
                <div className="text-center my-5">
                  <span className="font-medium text-gray-500">{product.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    size="lg"
                    className="bg-blue-700 flex items-center gap-2"
                    onClick={() => addToCart(product._id)}
                  >
                    <ShoppingCart />
                    <span>Add To Cart</span>
                  </Button>
                  <span className="font-bold text-slate-900">${product.price}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewProducts;
