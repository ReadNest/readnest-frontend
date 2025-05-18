import BookForm from "@/features/book/components/BookForm";

export default function CreateBookPage() {
  const onSubmit = () => {};
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create New Book</h1>
        <p className="text-gray-600">Add a new book to the ReadNest library</p>
      </div>

      <BookForm onSubmit={onSubmit} />
    </div>
  );
}
