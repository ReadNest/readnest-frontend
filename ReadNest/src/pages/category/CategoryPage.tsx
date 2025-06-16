import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesStart,
  updateCategoryStart,
  setPagingInfo,
} from "@/features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { DataTableWithPagination } from "@/components/ui/DataTableWithPagination";

type Category = {
  id: string;
  name: string;
  description: string;
};

export default function CategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryState = useSelector((state: RootState) => state.categories);
  const { pageIndex, pageSize } = categoryState.pagingInfo;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      dispatch(
        fetchCategoriesStart({
          pageIndex,
          pageSize: pageSize ?? 10,
        })
      );
    },
    [dispatch, pageSize]
  );

  useEffect(() => {
    dispatch(
      fetchCategoriesStart({
        pageIndex: pageIndex ?? 1,
        pageSize: pageSize ?? 10,
      })
    );
  }, [dispatch, pageIndex, pageSize]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEditModal = (category: any) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedCategory) return;
    dispatch(
      updateCategoryStart({
        id: selectedCategory.id,
        name: editName.trim(),
        description: editDescription.trim(),
      })
    );
    setEditModalOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>

        <DataTableWithPagination
          pagedData={categoryState.categories}
          columns={[
            { key: "name", label: "Name", isBold: true },
            { key: "description", label: "Description" },
          ]}
          onEdit={openEditModal}
          onDelete={(item) => console.log("Delete", item)}
          onAdd={() => navigate("/categories/create")}
          enableEdit={true}
          enableDelete={true}
          enableAdd={true}
          pagingInfo={categoryState.pagingInfo}
          onPageSizeChange={(newPageSize) => {
            dispatch(
              setPagingInfo({
                ...categoryState.pagingInfo,
                pageSize: newPageSize ?? 10,
              })
            );
            dispatch(
              fetchCategoriesStart({
                pageIndex: pageIndex ?? 1,
                pageSize: newPageSize ?? 10,
              })
            );
          }}
          onPageChange={handlePageChange}
        />
      </CardContent>

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
    </Card>
  );
}
