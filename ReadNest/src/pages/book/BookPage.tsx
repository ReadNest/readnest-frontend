import { Card, CardContent } from "@/components/ui/card";
import { DataTableWithPagination } from "@/components/ui/DataTableWithPagination";
import { fetchBooksStart, setPagingInfo } from "@/features/book/bookSlice";
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
        fetchBooksStart({
          pageIndex,
          pageSize: pageSize ?? 10,
        })
      );
    },
    [dispatch, pageSize]
  );

  useEffect(() => {
    dispatch(
      fetchBooksStart({ pageIndex: pageIndex ?? 1, pageSize: pageSize ?? 10 })
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
          onEdit={(item) => console.log("Edit", item)}
          onDelete={(item) => console.log("Delete", item)}
          onAdd={() => navigate("/books/new")}
          enableEdit={true}
          enableDelete={false}
          enableAdd={true}
          pagingInfo={bookPaging.pagingInfo}
          onPageSizeChange={(newPageSize) => {
            dispatch(
              setPagingInfo({
                ...bookPaging.pagingInfo,
                pageSize: newPageSize ?? 10,
              })
            );
            dispatch(
              fetchBooksStart({
                pageIndex: pageIndex ?? 1,
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
