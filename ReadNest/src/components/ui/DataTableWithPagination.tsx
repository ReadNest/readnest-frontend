/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useColumnResize } from "@/hooks/useColumnResize";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { useState } from "react";

interface PagingInfo {
  totalItems?: number;
  pageIndex?: number; // 1-based
  pageSize?: number;
}

interface DataTableProps<T> {
  pagedData: T[];
  columns: {
    key: keyof T | string;
    label: string;
    isBold?: boolean;
    minWidth?: number;
    maxWidth?: number;
    initialWidth?: number;
    format?: (value: any, row?: T) => React.ReactNode;
  }[];
  pagingInfo: PagingInfo;
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableAdd?: boolean;
  pageSizeOptions?: number[];
  className?: string;
  addButtonText?: string;
}

export function DataTableWithPagination<T>({
  pagedData,
  columns,
  pagingInfo,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onAdd,
  enableEdit = false,
  enableDelete = false,
  enableAdd = true,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className = "",
  addButtonText = "Add New",
}: DataTableProps<T>) {
  const tableRef = useColumnResize();

  const currentPage = pagingInfo.pageIndex ?? 1;
  const pageSize = pagingInfo.pageSize ?? pageSizeOptions[0];
  const totalCount = pagingInfo.totalItems ?? 0;

  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalCount / pageSize);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const renderPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) end = 4;
      else if (currentPage >= totalPages - 2) start = totalPages - 3;

      if (start > 2) pages.push(-1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push(-1);
      pages.push(totalPages);
    }

    return pages.map((page, idx) =>
      page === -1 ? (
        <PaginationItem key={`ellipsis-${idx}`}>
          <span className="px-2 text-muted-foreground">...</span>
        </PaginationItem>
      ) : (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === currentPage}
            onClick={() => onPageChange?.(page)}
            href="#"
            className="min-w-[2.5rem]"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Total: <strong>{totalCount}</strong> items
          </div>
          {enableAdd && (
            <Button
              onClick={onAdd}
              className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addButtonText}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newSize = Number(value);
              onPageSizeChange?.(newSize);
              onPageChange?.(1);
            }}
          >
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((opt) => (
                <SelectItem key={opt} value={opt.toString()}>
                  {opt}
                </SelectItem>
              ))}
              <SelectItem value={String(totalCount)}>All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full border rounded-md overflow-hidden">
        <div className="relative max-h-[calc(100vh-300px)] overflow-auto">
          <Table ref={tableRef} className="border-collapse table-auto w-full">
            <TableHeader className="sticky top-0 z-10">
              <TableRow className="hover:bg-inherit bg-gray-50/80 dark:bg-gray-800/80">
                {columns.map((col, index) => (
                  <TableHead
                    key={col.key.toString()}
                    className={`bg-inherit border-b border-r font-medium text-left p-3 ${
                      col.isBold ? "font-bold" : ""
                    } ${
                      index === columns.length - 1 &&
                      !(enableEdit || enableDelete)
                        ? "border-r-0"
                        : ""
                    }`}
                    style={{
                      width: col.initialWidth
                        ? `${col.initialWidth}px`
                        : undefined,
                      minWidth: col.minWidth ? `${col.minWidth}px` : undefined,
                      maxWidth: col.maxWidth ? `${col.maxWidth}px` : undefined,
                    }}
                  >
                    {col.label}
                  </TableHead>
                ))}
                {(enableEdit || enableDelete) && (
                  <TableHead className="bg-inherit border-b border-r-0 font-medium text-right p-3">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedData.length > 0 ? (
                pagedData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-150 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-950"
                        : "bg-gray-50/30 dark:bg-gray-900/30"
                    }`}
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={col.key.toString()}
                        className={`p-3 text-sm border-r ${
                          col.isBold ? "font-bold" : ""
                        } ${
                          colIndex === columns.length - 1 &&
                          !(enableEdit || enableDelete)
                            ? "border-r-0"
                            : ""
                        }`}
                      >
                        {col.format
                          ? col.format((item as any)[col.key], item)
                          : (item as any)[col.key]}
                      </TableCell>
                    ))}
                    {(enableEdit || enableDelete) && (
                      <TableCell className="p-3 text-right border-r-0">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit?.(item)}
                            className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            disabled={!enableEdit}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setItemToDelete(item);
                              setShowConfirmDialog(true);
                            }}
                            className="h-8 w-8 p-0"
                            disabled={!enableDelete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-inherit">
                  <TableCell
                    colSpan={
                      columns.length + (enableEdit || enableDelete ? 1 : 0)
                    }
                    className="h-24 text-center text-muted-foreground border-r-0"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange?.(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange?.(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this item?
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            This action cannot be undone.
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (itemToDelete) onDelete?.(itemToDelete);
                setShowConfirmDialog(false);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
