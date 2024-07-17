import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import ProductSelect from "../modules/ProductSelect";

const ProductForm = ({
  _id,
  title: existTitle,
  description: existDescription,
  price: existPrice,
  category: existCategory,
  properties: existpropertiesValue,
}) => {
  const [title, setTitle] = useState(existTitle || "");
  const [description, setDescription] = useState(existDescription || "");
  const [price, setPrice] = useState(existPrice || "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(existCategory || "");
  const [propertiesValue, setPropertiesValue] = useState(
    existpropertiesValue || {}
  );

  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      category,
      properties: propertiesValue,
    };
    if (_id) {
      await axios.put("/api/products/", { ...data, _id });
      router.push("/products");
    } else {
      await axios.post("/api/products", data);
      router.push("/products");
    }
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  const productProp = (propname, value) => {
    setPropertiesValue((prev) => {
      const newprop = { ...prev };
      newprop[propname] = value;
      return newprop;
    });
  };

  console.log(propertiesValue);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((result) => setCategories(result.data.data));
  }, []);

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
          <span className="text-slate-900 font-medium text-sm">
            Product Category :
          </span>
          <ProductSelect
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div>
          <div className="w-full max-w-sm">
            {propertiesToFill &&
              propertiesToFill.map((item) => (
                <div className="flex flex-col gap-2 mb-2">
                  <div>{item.name}</div>
                  <div>
                    <select
                      value={propertiesValue[item.name]}
                      onChange={(e) => productProp(item.name, e.target.value)}
                      className="w-full px-[14px] bg-transparent border border-gray-200 rounded-md h-[40px]"
                    >
                      {item.value.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
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
