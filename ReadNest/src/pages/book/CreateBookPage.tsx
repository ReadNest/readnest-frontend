import BookForm from "@/features/book/components/BookForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CreateBookRequest } from "@/api/@types";
import type { RootState } from "@/store";
import { createBookStart } from "@/features/book/bookSlice";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateBookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state: RootState) => state.book.isSuccess);

  const onSubmit = (data: CreateBookRequest) => {
    dispatch(createBookStart({ ...data }));
    if (isSuccess) navigate("/books");
  };

  return (
    <Card>
      <CardContent>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Book
            </h1>
            <p className="text-gray-600">
              Add a new book to the ReadNest library
            </p>
          </div>

          <BookForm onSubmit={onSubmit} />
        </div>
      </CardContent>
    </Card>
  );
}
