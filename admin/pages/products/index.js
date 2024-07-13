import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "@/components/modules/ProductTable";

const Products = () => {

  const [products , setProducts] = useState([])

  const fetchProduct = async () => {
    return await axios.get('/api/products')
    .then(response => setProducts(response.data))
  }

  useEffect(()=> {
    fetchProduct()
  },[])

  console.log(products)
  return (
    <div>
      <div className="flex mb-8">
        <Link
          href="/products/new"
          className="flex items-center text-white p-3 rounded-lg bg-sky-900"
        >
          <Plus />
          Add New Porduct
        </Link>
      </div>
      <div className="max-w-3xl">
        <ProductTable products={products}/>
      </div>
    </div>
  );
};

export default Products;
