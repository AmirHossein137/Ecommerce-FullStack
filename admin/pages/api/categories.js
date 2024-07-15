import { Category } from "@/models/Category";
import connectDB from "@/utils/connectDB";

export default async function hanle(req, res) {
  await connectDB();
  const { method } = req;
  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const categoryAdd = await Category.create({
      name,
      parent: parentCategory || undefined,
    });
    res.json({ message: "success", data: categoryAdd });
  } 
  else if (method === "GET") {
    const categorys = await Category.find().populate("parent");
    res.json({ message: "success", data: categorys });
  } 
  else if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const editCat = await Category.updateOne(
      { _id },
      { name, parent: parentCategory }
    );
    res.json({ message: "success", data: editCat });
  } 
  else if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
