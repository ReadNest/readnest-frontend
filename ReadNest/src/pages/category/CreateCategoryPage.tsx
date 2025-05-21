// app/category/CreateCategoryPage.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryStart } from "@/features/category/categorySlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { Card } from "@/components/ui/card";

export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isSuccess } = useSelector((state: RootState) => state.categories);

  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createCategoryStart(form));
  };

  if (isSuccess) {
    navigate("/categories");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
        <Card className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    required
                />
                </div>
                <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter category description"
                    required
                />
                </div>
                <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/categories")}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </Button>
                </div>
            </form>
        </Card>
    </div>
  );
}
