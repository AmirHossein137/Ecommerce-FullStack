import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  
  export default function CategoryTable({categories}) {
    return (
      <Table className="w-full max-w-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.name}>
              <TableCell>{cat.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  