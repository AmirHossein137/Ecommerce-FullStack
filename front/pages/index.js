import NewProducts from "@/components/modules/NewProducts";
import { Product } from "@/models/Product";
import connectDB from "@/utils/connectDB";

export default function Home({ newProduct }) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-2 mt-5">
      <NewProducts newProduct={newProduct} />
    </div>
  );
}

export async function getServerSideProps() {
  await connectDB();
  const newProduct = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      newProduct: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
