import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategorySelect({
  categories,
  parentCategory,
  setParentCategory,
}) {
  

  return (
    <Select value={parentCategory} onValueChange={setParentCategory}>
      <SelectTrigger className="w-[350px]">
        <SelectValue placeholder="Select Your Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="0">No Parent Category</SelectItem>
          {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
