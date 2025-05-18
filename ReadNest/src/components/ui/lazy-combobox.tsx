import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

type LazyComboboxProps<T> = {
  value: string | null;
  onChange: (value: string | null) => void;
  data: T[];
  displayField: keyof T;
  valueField: keyof T;
  fetchMoreData: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  placeholder: string;
};

export function LazyCombobox<T>({
  value,
  onChange,
  data,
  displayField,
  valueField,
  fetchMoreData,
  pageIndex,
  pageSize,
  totalItems,
  placeholder,
}: LazyComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const listRef = useRef<HTMLDivElement | null>(null);

  const hasMore = pageIndex * pageSize < totalItems;

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const nearBottom = scrollHeight - scrollTop <= clientHeight + 50;

    if (nearBottom && hasMore) {
      fetchMoreData(pageIndex + 1);
    }
  };

  const filteredData = data.filter((item) =>
    String(item[displayField]).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className={cn(
            "flex items-center justify-between border rounded-md px-3 py-2 w-full cursor-pointer",
            !value && "text-muted-foreground"
          )}
        >
          <span>
            {value
              ? String(
                  data.find((item) => item[valueField] === value)?.[
                    displayField
                  ]
                )
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Tìm kiếm..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          <CommandList
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-auto"
          >
            {filteredData.map((item, index) => {
              const itemValue = String(item[valueField]);
              const itemLabel = String(item[displayField]);

              return (
                <CommandItem
                  key={index}
                  value={itemValue}
                  onSelect={() => {
                    onChange(itemValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === itemValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {itemLabel}
                </CommandItem>
              );
            })}
            {hasMore && (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Đang tải thêm...
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
