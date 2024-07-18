import { Category } from "@/models/Category";
import connectDB from "@/utils/connectDB";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function hanle(req, res) {
  await connectDB();
  await isAdminRequest(req, res);

  const { method } = req;

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryAdd = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json({ message: "success", data: categoryAdd });
  }

  if (method === "GET") {
    const categorys = await Category.find().populate("parent");
    res.json({ message: "success", data: categorys });
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
