import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesStart,
  updateCategoryStart,
  resetState,
} from "@/features/category/categorySlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type Category = {
  id: string;
  name: string;
  description: string;
};

export default function CategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, pagingInfo } = useSelector(
    (state: RootState) => state.categories
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesStart({ pageIndex: 1, pageSize: 10 }));
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const openEditModal = (category: any) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedCategory) return;
  
    dispatch(updateCategoryStart({
      id: selectedCategory.id,
      name: editName.trim(),
      description: editDescription.trim(),
    }));
  
    setEditModalOpen(false);
  };

  const pageIndex = pagingInfo.pageIndex ?? 1;
  const pageSize = pagingInfo.pageSize ?? 10;
  const totalItems = pagingInfo.totalItems ?? 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => navigate("/categories/create")}>
          + Create New
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-muted-foreground">No categories found.</p>
      ) : (
        <div className="border rounded-xl overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: any, index: number) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {(pageIndex - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(category)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => alert("Delete logic")}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {totalItems > pageSize && (
        <div className="flex justify-end mt-6 gap-2">
          <Button
            variant="outline"
            onClick={() =>
              dispatch(
                fetchCategoriesStart({
                  pageIndex: pageIndex - 1,
                  pageSize,
                })
              )
            }
            disabled={pageIndex === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              dispatch(
                fetchCategoriesStart({
                  pageIndex: pageIndex + 1,
                  pageSize,
                })
              )
            }
            disabled={pageIndex * pageSize >= totalItems}
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Category Name"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Category Description"
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
