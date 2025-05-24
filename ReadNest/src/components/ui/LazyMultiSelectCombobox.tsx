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
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

type LazyMultiSelectComboboxProps<T> = {
  values: string[];
  onChange: (values: string[]) => void;
  data: T[];
  displayField: keyof T;
  valueField: keyof T;
  fetchMoreData: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  placeholder: string;
};

export function LazyMultiSelectCombobox<T>({
  values,
  onChange,
  data,
  displayField,
  valueField,
  fetchMoreData,
  pageIndex,
  pageSize,
  totalItems,
  placeholder,
}: LazyMultiSelectComboboxProps<T>) {
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

  const toggleSelect = (itemValue: string) => {
    if (values.includes(itemValue)) {
      onChange(values.filter((v) => v !== itemValue));
    } else {
      onChange([...values, itemValue]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className={cn(
            "flex items-center justify-between border rounded-md px-3 py-2 w-full cursor-pointer min-h-[40px] flex-wrap gap-1",
            !values.length && "text-muted-foreground"
          )}
        >
          {values.length > 0 ? (
            <div className="flex flex-wrap gap-1 max-w-[240px]">
              {values
                .map((val) => data.find((d) => String(d[valueField]) === val))
                .filter(Boolean)
                .map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-sm px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    {String(item?.[displayField])}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(String(item?.[valueField]));
                      }}
                    />
                  </span>
                ))}
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
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
              const selected = values.includes(itemValue);

              return (
                <CommandItem
                  key={index}
                  value={itemValue}
                  onSelect={() => toggleSelect(itemValue)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected ? "opacity-100" : "opacity-0"
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
