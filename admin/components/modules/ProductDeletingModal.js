import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

export function ProductDeletingModal({ data }) {
  const router = useRouter();
  const deleteHandler = async () => {
    const res = await axios.delete("/api/products?id=" + data._id);
    if (res.status === 200) {
      router.refresh();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="p-4 bg-rose-600 hover:bg-rose-700 transition duration-300">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-lg font-medium text-gray-700">
            {" "}
            Are You Sure Delete{" "}
            <span className="text-rose-800 font-bold">
              "{data.title}"
            </span> ?{" "}
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="flex items-center w-full justify-center gap-3">
            <DialogClose asChild>
              <Button type="button" size="lg" className="bg-green-600">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="lg" onClick={deleteHandler} type="submit">
                Delete
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
