import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/layout/ProductForm";

const EditPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
      console.log(productInfo)
    });
  }, [id]);
  return <div>{productInfo && <ProductForm {...productInfo} />}</div>;
};

export default EditPage;
