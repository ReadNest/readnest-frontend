import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FormDateFieldProps {
  label: string;
  date?: Date;
  setDate: (date?: Date) => void;
  error?: string;
}

export default function FormDateField({
  label,
  date,
  setDate,
  error,
}: FormDateFieldProps) {
  return (
    <div className={`space-y-1 relative ${error ? "mb-8" : ""}`}>
      <Label className="block text-left p-1">{label}</Label>

      <TooltipProvider>
        <Tooltip open={!!error}>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full justify-between items-center rounded-md border border-input bg-background px-3 py-2 text-sm",
                    error && "border-red-500"
                  )}
                >
                  <span>
                    {date ? format(date, "dd/MM/yyyy") : "Chọn ngày sinh"}
                  </span>
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="start"
            className="bg-red-500 text-white border-red-500"
          >
            {error}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
