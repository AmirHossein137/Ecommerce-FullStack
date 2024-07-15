import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CategoryTable({
  categories,
  EditCategoryHandler,
  deleteCategory,
}) {
  return (
    <Table className="w-full max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Parent Category</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat._id}>
            <TableCell>{cat.name}</TableCell>
            <TableCell>{cat.parent?.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <button
                  className="bg-orange-400 text-white w-[50%] flex items-center justify-center py-2 rounded-lg"
                  onClick={() => EditCategoryHandler(cat)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat)}
                  className="w-[50%] bg-rose-600 text-white py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
