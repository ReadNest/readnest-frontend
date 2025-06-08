import { Card, CardContent } from "@/components/ui/card";
import { DataTableWithPagination } from "@/components/ui/DataTableWithPagination";
import {
  deleteBookRequest,
  fetchBooksStartV1,
  setPagingInfo,
} from "@/features/book/bookSlice";
import type { RootState } from "@/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookPaging = useSelector((state: RootState) => state.book);

  const { pageIndex, pageSize } = bookPaging.pagingInfo;

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      dispatch(
        fetchBooksStartV1({
          pageIndex,
          pageSize: pageSize ?? 10,
        })
      );
    },
    [dispatch, pageSize]
  );

  useEffect(() => {
    dispatch(
      fetchBooksStartV1({ pageIndex: pageIndex ?? 1, pageSize: pageSize ?? 10 })
    );
  }, [dispatch, pageIndex, pageSize]);

  return (
    <Card>
      <CardContent className="p-5">
        <DataTableWithPagination
          pagedData={bookPaging.books}
          columns={[
            { key: "id", label: "ID", isBold: true },
            { key: "title", label: "Title" },
            { key: "author", label: "Author" },
            { key: "averageRating", label: "Rating" },
            { key: "isbn", label: "ISBN" },
            { key: "language", label: "Language" },
          ]}
          onEdit={(item) => navigate(`/books/edit/${item.id}`)}
          onDelete={(item) => dispatch(deleteBookRequest(item.id ?? ""))}
          onAdd={() => navigate("/books/new")}
          enableEdit={true}
          enableDelete={true}
          enableAdd={true}
          pagingInfo={bookPaging.pagingInfo}
          onPageSizeChange={(newPageSize) => {
            dispatch(
              setPagingInfo({
                ...bookPaging.pagingInfo,
                pageIndex: 1,
                pageSize: newPageSize ?? 10,
              })
            );
            dispatch(
              fetchBooksStartV1({
                pageIndex: 1,
                pageSize: newPageSize ?? 10,
              })
            );
          }}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}

export default BookPage;
