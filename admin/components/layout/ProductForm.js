import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

const ProductForm = ({
  title: existTitle,
  description: existDescription,
  price: existPrice,
}) => {
  const [title, setTitle] = useState(existTitle || "");
  const [description, setDescription] = useState(existDescription || "");
  const [price, setPrice] = useState(existPrice || "");
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    const res = await axios.post("/api/products", data);
    if (res.status === 200) {
      toast.success(res.message);
      router.push("/products");
    }
  };
  return (
    <div>
      <span className="text-lg font-bold text-gray-600">
        Add Your Product ...
      </span>
      <form onSubmit={createProduct} className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col w-full max-w-sm gap-3">
          <Label htmlFor="name" className="text-slate-900 font-medium">
            Product Name:
          </Label>
          <Input
            type="text"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-300"
            placeholder="Product Name..."
          />
        </div>
        <div className="flex flex-col w-full max-w-sm gap-3">
          <Label htmlFor="price" className="text-slate-900 font-medium">
            Price (in USD):
          </Label>
          <Input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-gray-300"
            placeholder="Price..."
          />
        </div>
        <div className="flex flex-col w-full max-w-sm gap-3">
          <Label htmlFor="description" className="text-slate-900 font-medium">
            Description:
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Type your message here."
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="outline"
            className="bg-sky-900 text-white"
            size="lg"
          >
            Save
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default ProductForm;
