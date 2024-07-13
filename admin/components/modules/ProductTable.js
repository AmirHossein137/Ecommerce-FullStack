import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil , Trash2 } from 'lucide-react';
import Link from "next/link";
import { ProductDeletingModal } from "./ProductDeletingModal";

export default function ProductTable({ products }) {
  console.log(products);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>price</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.title}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell className="w-[200px]">
              <div className="flex w-full items-center gap-2">
                <Link
                  href={`/products/edit/${data._id}`}
                  className="w-[50%] flex items-center gap-2 justify-center p-3 rounded-lg text-white bg-orange-400 hover:bg-orange-500 transition duration-200"
                >
                    <Pencil width={15}/>
                  Edit
                </Link>
                <ProductDeletingModal data={data}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
