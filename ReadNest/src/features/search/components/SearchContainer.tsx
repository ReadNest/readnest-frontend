import { useState } from "react";
import InputSearch from "./InputSearch";
import SearchDropdown from "./SearchDropdown";

const SearchContainer = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="relative">
      <InputSearch onSearch={setSearchText} placeholder="Tìm kiếm sách..." />
      <SearchDropdown searchText={searchText} />
    </div>
  );
};

export default SearchContainer;
