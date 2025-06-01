import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InputSearch from "./InputSearch";
import type { GetCategoryResponse } from "@/api/@types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FilterSidebarProps = {
  genres: GetCategoryResponse[];
  languages: { id: string; name: string }[];
  onFilterChange?: (filters: { genres: string[]; languages: string[] }) => void;
};

export function FilterSidebar({
  genres,
  languages,
  onFilterChange,
}: FilterSidebarProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [genreSearchText, setGenreSearchText] = useState("");
  const [languageSearchText, setLanguageSearchText] = useState("");

  const filteredGenres = useMemo(() => {
    return genreSearchText
      ? genres.filter((g) =>
          g?.name?.toLowerCase().includes(genreSearchText.toLowerCase())
        )
      : genres;
  }, [genreSearchText, genres]);

  const filteredLanguages = useMemo(() => {
    return languageSearchText
      ? languages.filter((l) =>
          l.name.toLowerCase().includes(languageSearchText.toLowerCase())
        )
      : languages;
  }, [languageSearchText, languages]);

  const updateFilter = (newGenres: string[], newLanguages: string[]) => {
    onFilterChange?.({ genres: newGenres, languages: newLanguages });
  };

  const toggleSelected = (
    value: string,
    selectedList: string[],
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>,
    isGenre: boolean
  ) => {
    const newSelected = selectedList.includes(value)
      ? selectedList.filter((v) => v !== value)
      : [...selectedList, value];

    setSelectedList(newSelected);

    if (isGenre) {
      updateFilter(newSelected, selectedLanguages);
    } else {
      updateFilter(selectedGenres, newSelected);
    }
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setGenreSearchText("");
    setLanguageSearchText("");
    updateFilter([], []);
  };

  const renderFilterList = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    isGenre: boolean
  ) => (
    <ScrollArea className="h-[180px] pr-1">
      <div className="space-y-1">
        {items.length ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-50 transition cursor-pointer"
              onClick={() =>
                toggleSelected(item.id, selected, setSelected, isGenre)
              }
            >
              <Checkbox
                checked={selected.includes(item.id)}
                onCheckedChange={() =>
                  toggleSelected(item.id, selected, setSelected, isGenre)
                }
                className="data-[state=checked]:bg-indigo-600"
              />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 px-2 italic">
            Không tìm thấy kết quả.
          </p>
        )}
      </div>
    </ScrollArea>
  );

  const renderLanguageFilterList = (
    items: { id: string; name: string }[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <RadioGroup
      value={selected[0] || ""}
      onValueChange={(val) => {
        setSelected([val]);
        updateFilter(selectedGenres, [val]);
      }}
      className="space-y-1 px-1"
    >
      {items.length ? (
        items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-50 transition cursor-pointer"
          >
            <RadioGroupItem
              value={item.id}
              id={`language-${item.id}`}
              className="border-gray-300 text-indigo-600"
            />
            <label
              htmlFor={`language-${item.id}`}
              className="text-sm text-gray-700"
            >
              {item.name}
            </label>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 px-2 italic">
          Không tìm thấy kết quả.
        </p>
      )}
    </RadioGroup>
  );

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 border border-gray-200 space-y-4">
      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="genre">
          <AccordionTrigger className="text-base font-medium text-gray-800">
            Thể loại
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            <InputSearch
              placeholder="Tìm thể loại..."
              onSearch={setGenreSearchText}
              disableNavigate={true}
            />
            {renderFilterList(
              filteredGenres,
              selectedGenres,
              setSelectedGenres,
              true
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="language">
          <AccordionTrigger className="text-base font-medium text-gray-800">
            Ngôn ngữ
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            <InputSearch
              placeholder="Tìm ngôn ngữ..."
              onSearch={setLanguageSearchText}
              disableNavigate={true}
            />
            {renderLanguageFilterList(
              filteredLanguages,
              selectedLanguages,
              setSelectedLanguages
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        onClick={resetFilters}
        className="w-full py-2 rounded-md border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
      >
        Làm mới bộ lọc
      </button>
    </div>
  );
}
