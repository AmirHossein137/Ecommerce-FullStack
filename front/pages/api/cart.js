import { Product } from "@/models/Product";
import connectDB from "@/utils/connectDB";

export default async function handle(req, res) {
  await connectDB();
  const id = req.body.id;
  res.json(await Product.find({ _id: id }));
}
