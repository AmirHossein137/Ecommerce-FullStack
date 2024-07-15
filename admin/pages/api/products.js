import { Product } from "@/models/Product";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;
  if (method === "POST") {
    const { title, price, description , category } = req.body;
    const product = await Product.create({ title, price, description , category });
    res.json({ message: "Product Added...", data: product });
  } else if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  } else if (method === "PUT") {
    const { title, price, description, _id , category } = req.body;
    await Product.updateOne({ _id }, { title, price, description , category });
    res.json(true);
  } else if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true)
    }
  }
}
