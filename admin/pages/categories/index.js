import CategorySelect from "@/components/modules/CategorySelect";
import CategoryTable from "@/components/modules/CategoryTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Categories = () => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  const fetchCategory = async () => {
    const res = await fetch("/api/categories");
    const result = await res.json();
    console.log(result.data);
    setCategories(result.data);
  };

  const saveCategoryHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name , parentCategory }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.message) {
      toast.success(`${result.data.name} Added`);
      setName("");
      fetchCategory();
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Categories</h1>
      <form onSubmit={saveCategoryHandler} className="mb-7">
        <div className="flex flex-col w-full max-w-3xl gap-3">
          <Label htmlFor="catname" className="text-slate-900 font-medium">
            Category Name :
          </Label>
          <div className="flex items-center gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="catname"
              type="text"
              placeholder="Category Name ..."
            />
            <CategorySelect
              categories={categories}
              parentCategory={parentCategory}
              setParentCategory={setParentCategory}
            />
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
      <div>
        <div>
          <h1 className="mb-5 text-slate-900 tex-2xl font-bold">
            Category Lists :
          </h1>
          <CategoryTable categories={categories} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Categories;
