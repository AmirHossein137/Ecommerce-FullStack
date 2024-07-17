import CategorySelect from "@/components/modules/CategorySelect";
import CategoryTable from "@/components/modules/CategoryTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";
import axios from "axios";

const Categories = ({ swal }) => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  const fetchCategory = async () => {
    const res = await fetch("/api/categories");
    const result = await res.json();
    console.log(result.data);
    setCategories(result.data);
  };

  const saveCategoryHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        value: p.value.split(","),
      })),
    };
    if (editCategory) {
      data._id = editCategory._id;
      await axios.put("/api/categories", data);
      setEditCategory(null);
      fetchCategory();
      setName("");
    } else {
      await axios.post("/api/categories", data);
      setName("");
      setParentCategory("");
      setProperties([]);
      fetchCategory();
    }
  };

  const EditCategoryHandler = (cat) => {
    console.log(cat);
    setEditCategory(cat);
    setName(cat.name);
    setParentCategory(cat.parent?._id);
    setProperties(
      cat.properties.map(({ name, value }) => ({
        name,
        value: value.join(","),
      }))
    );
  };

  const deleteCategory = (cat) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${cat.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = cat;
          await fetch("/api/categories?_id=" + _id, {
            method: "DELETE",
          });
          fetchCategory();
        }
      });
  };

  const addPropertiesHandler = () => {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  };

  const nameChangeHandler = (index, property, newName) => {
    console.log({ index, property, newName });
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const valueChangeHandler = (index, property, newValue) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  };

  const propertyDeleteHandler = (index) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties.splice(index, 1);
      return properties;
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        {editCategory ? "Edit Categories" : "Create New Category"}
      </h1>
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
          </div>
          <div>
            <p className="text-lg mb-3 text-slate-800 font-medium">
              Properties
            </p>
            <Button onClick={addPropertiesHandler} type="button">
              Add Properties
            </Button>
            <div className="flex flex-col w-full max-w-3xl gap-3">
              {properties.length > 0 &&
                properties?.map((property, index) => (
                  <div className="flex items-center gap-2 mt-3">
                    <Input
                      type="text"
                      value={property.name}
                      placeholder="Property Name... "
                      onChange={(e) =>
                        nameChangeHandler(index, property, e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      value={property.value}
                      placeholder="Property Value... "
                      onChange={(e) =>
                        valueChangeHandler(index, property, e.target.value)
                      }
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => propertyDeleteHandler(index)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <Button type="submit" className="bg-green-700 font-bold">
            Save
          </Button>
        </div>
      </form>
      <div>
        <div>
          <h1 className="mb-5 text-slate-900 tex-2xl font-bold">
            Category Lists :
          </h1>
          <CategoryTable
            categories={categories}
            EditCategoryHandler={EditCategoryHandler}
            deleteCategory={deleteCategory}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
