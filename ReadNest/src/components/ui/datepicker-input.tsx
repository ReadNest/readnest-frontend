/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface DatePickerProps {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  showYearMonthSelector?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export default function DatePickerInput({
  date,
  onChange,
  label,
  error,
  placeholder = "Chọn ngày",
  showYearMonthSelector = true,
  minDate,
  maxDate,
  disabled = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(date || new Date());

  // Tạo danh sách năm (từ 1950 đến năm hiện tại + 10)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 11 },
    (_, i) => 1950 + i
  ).reverse();

  // Danh sách tháng tiếng Việt
  const months = [
    { value: 0, label: "Tháng 1" },
    { value: 1, label: "Tháng 2" },
    { value: 2, label: "Tháng 3" },
    { value: 3, label: "Tháng 4" },
    { value: 4, label: "Tháng 5" },
    { value: 5, label: "Tháng 6" },
    { value: 6, label: "Tháng 7" },
    { value: 7, label: "Tháng 8" },
    { value: 8, label: "Tháng 9" },
    { value: 9, label: "Tháng 10" },
    { value: 10, label: "Tháng 11" },
    { value: 11, label: "Tháng 12" },
  ];

  const handleYearChange = (year: string) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(parseInt(year));
    setCurrentMonth(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(parseInt(month));
    setCurrentMonth(newDate);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onChange(selectedDate);
    setIsOpen(false);
  };

  // Shortcuts cho ngày thông dụng
  const getQuickDateOptions = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return [
      { label: "Hôm nay", date: today },
      { label: "Hôm qua", date: yesterday },
      { label: "Ngày mai", date: tomorrow },
      { label: "1 tuần trước", date: oneWeekAgo },
      { label: "1 tháng trước", date: oneMonthAgo },
    ];
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, "EEEE, dd/MM/yyyy", { locale: vi });
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 p-1">
          {label}
        </label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={`w-full justify-start text-left font-normal h-10 ${
              !date && "text-muted-foreground"
            } ${error ? "border-red-500 focus:border-red-500" : ""} ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {date ? formatDisplayDate(date) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 space-y-3">
            {/* Quick date shortcuts */}
            <div className="grid grid-cols-2 gap-2">
              {getQuickDateOptions().map((option) => (
                <Button
                  key={option.label}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => handleDateSelect(option.date)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="border-t pt-3">
              {/* Year and Month selectors */}
              {showYearMonthSelector && (
                <div className="flex gap-2 mb-3">
                  <Select
                    value={currentMonth.getFullYear().toString()}
                    onValueChange={handleYearChange}
                  >
                    <SelectTrigger className="w-24 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-48">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={currentMonth.getMonth().toString()}
                    onValueChange={handleMonthChange}
                  >
                    <SelectTrigger className="flex-1 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem
                          key={month.value}
                          value={month.value.toString()}
                        >
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Calendar */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                locale={vi}
                fromDate={minDate}
                toDate={maxDate}
                initialFocus
                className="rounded-md"
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors",
                  day_selected:
                    "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-600",
                  day_today:
                    "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 font-semibold",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled:
                    "text-muted-foreground opacity-50 cursor-not-allowed",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeft className="h-4 w-4" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRight className="h-4 w-4" />
                  ),
                }}
              />

              {/* Today button */}
              <div className="border-t pt-3 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8"
                  onClick={() => handleDateSelect(new Date())}
                >
                  Chọn hôm nay
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
