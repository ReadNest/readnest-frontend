import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
}

export default function DatePickerInput({
  date,
  onChange,
  label,
  error,
}: DatePickerProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-left p-1">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              !date && "text-muted-foreground"
            } ${error ? "border-red-500" : ""}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd-MM-yyyy") : "Chọn ngày sinh"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
