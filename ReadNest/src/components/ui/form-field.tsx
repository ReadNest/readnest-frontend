import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  error,
  register,
  className = "",
  onChange,
}: FormFieldProps) {
  return (
    <div className={`space-y-1 relative ${error ? "mb-8" : ""}`}>
      <Label htmlFor={id} className="block text-left p-1">
        {label}
      </Label>
      <TooltipProvider>
        <Tooltip open={!!error}>
          <TooltipTrigger asChild>
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              {...(register ? register(id) : {})}
              onChange={onChange}
              className={`${error ? "border-red-500" : ""} ${className}`}
            />
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
