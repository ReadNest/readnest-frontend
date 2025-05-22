import { Card, CardContent } from "@/components/ui/card";
import { LazyCombobox } from "@/components/ui/lazy-combobox";
import { createAffiliateStart } from "@/features/affiliate/affiliateSlice";
import AffiliateLinksForm, {
  type AffiliateLink,
} from "@/features/affiliate/components/AffiliateLinksForm";
import { fetchBooksStart } from "@/features/book/bookSlice";
import { showToastMessage } from "@/lib/utils";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateBookAffiliateLinks() {
  const dispatch = useDispatch();
  const { books, pagingInfo } = useSelector((state: RootState) => state.book);
  const errorMessage = useSelector((state: RootState) => state.error);
  const isSuccess = useSelector(
    (state: RootState) => state.affiliate.isSuccess
  );

  useEffect(() => {
    showToastMessage({
      message: errorMessage.message ?? "",
      messageId: errorMessage.messageId,
    });
  }, [errorMessage]);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedBookAffiliateLinks, setSelectedBookAffiliateLinks] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any[]
  >([]);

  const handleFetchMoreBooks = (nextPage: number) => {
    dispatch(
      fetchBooksStart({
        pageIndex: nextPage,
        pageSize: pagingInfo.pageSize || 10,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchBooksStart({ pageIndex: 1, pageSize: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBookId) {
      const selectedBook = books.find((book) => book.id === selectedBookId);
      if (selectedBook && selectedBook.affiliateLinks) {
        setSelectedBookAffiliateLinks(selectedBook.affiliateLinks);
      } else {
        setSelectedBookAffiliateLinks([]);
      }
    } else {
      setSelectedBookAffiliateLinks([]);
    }
  }, [selectedBookId, books]);

  const handleBookSelection = (bookId: string | null) => {
    setSelectedBookId(bookId);
  };

  const handleSubmitAffiliateLinks = (links: AffiliateLink[]) => {
    if (!selectedBookId || !selectedBookId) return;

    dispatch(
      createAffiliateStart({ bookId: selectedBookId, affiliateLinks: links })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess]);

  const resetForm = () => {
    setSelectedBookId(null);
    setSelectedBookAffiliateLinks([]);
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <Card>
      <CardContent>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Book Affiliate Links
            </h1>
            <p className="text-gray-600">
              Add multiple affiliate links for books from different partners
            </p>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Select Book
            </label>
            <LazyCombobox
              value={selectedBookId}
              onChange={handleBookSelection}
              data={books}
              valueField="id"
              displayField="title"
              fetchMoreData={handleFetchMoreBooks}
              pageIndex={pagingInfo.pageIndex || 1}
              pageSize={pagingInfo.pageSize || 10}
              totalItems={pagingInfo.totalItems || 0}
              placeholder="Chọn sách"
            />
          </div>

          <AffiliateLinksForm
            bookId={selectedBookId ?? ""}
            initialAffiliateLinks={selectedBookAffiliateLinks}
            onSubmit={handleSubmitAffiliateLinks}
            onCancel={handleCancel}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateBookAffiliateLinks;
