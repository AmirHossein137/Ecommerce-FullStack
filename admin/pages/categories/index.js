import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Categories = () => {
  const [name, setName] = useState();

  const saveCategoryHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.message) {
      toast.success(`${result.data.name} Added`);
      setName("")
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Categories</h1>
      <form onSubmit={saveCategoryHandler}>
        <div className="flex flex-col w-full max-w-sm gap-3">
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
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Categories;
