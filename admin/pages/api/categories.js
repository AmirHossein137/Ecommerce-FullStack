import { Category } from "@/models/Category";
import connectDB from "@/utils/connectDB";

export default async function hanle(req, res) {
  await connectDB();
  const { method } = req;
  if (method === "POST") {
    const { name } = req.body;
    const categoryAdd = await Category.create({ name });
    res.json({ message: "success", data: categoryAdd });
  } else if (method === "GET") {
    const categorys = await Category.find();
    res.json({ message: "success", data: categorys });
  }
}
