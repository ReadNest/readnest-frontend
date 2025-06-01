import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useNavigate } from "react-router-dom";

interface InputSearchProps {
  onSearch: (value: string) => void;
}

const InputSearch = ({ onSearch }: InputSearchProps) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 300);
  const navigate = useNavigate();

  useEffect(() => {
    onSearch(debouncedSearch.trim());
  }, [debouncedSearch, onSearch]);

  return (
    <div className="relative h-10">
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        placeholder="Tìm kiếm sách..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="pl-8 pr-2 py-2 w-40 md:w-60 h-full"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            navigate(`/search?keyword=${encodeURIComponent(searchText)}`);
          }
        }}
      />
    </div>
  );
};

export default InputSearch;
