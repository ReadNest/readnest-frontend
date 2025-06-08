import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "@/features/book/components/BookForm";
import type { UpdateBookRequest, Book } from "@/api/@types";
import type { RootState } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { getBookByIdStart, updateBookStart } from "@/features/book/bookSlice";

export default function EditBookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isSuccess = useSelector((state: RootState) => state.book.isSuccess);
  const bookData = useSelector((state: RootState) => state.book.selectedBook);
  const [defaultValues, setDefaultValues] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getBookByIdStart(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (bookData) {
      setDefaultValues(bookData);
    }
  }, [bookData]);

  const onSubmit = (data: UpdateBookRequest) => {
    if (!id) return;
    dispatch(updateBookStart({ id: id, book: { ...data } }));
    if (isSuccess) navigate("/books");
  };

  if (!defaultValues) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Edit Book</h1>
            <p className="text-gray-600">Update the details of the book</p>
          </div>

          <BookForm
            onSubmit={onSubmit}
            defaultValues={{
              categoryIds: defaultValues.categories
                ?.map((x) => x.id)
                .filter((id): id is string => typeof id === "string"),
              ...defaultValues,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
