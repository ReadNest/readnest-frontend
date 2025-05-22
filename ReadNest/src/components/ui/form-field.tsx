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
  icon?: React.ReactNode;
  required?: boolean;
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
  icon,
  required = false, // default false
}: FormFieldProps) {
  return (
    <div className={`space-y-1 relative ${error ? "mb-8" : ""}`}>
      <Label htmlFor={id} className="block text-left p-1">
        {label}{" "}
        {required && (
          <span className="text-red-500" title="Required">
            *
          </span>
        )}
      </Label>
      <TooltipProvider>
        <Tooltip open={!!error}>
          <TooltipTrigger asChild>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  {icon}
                </div>
              )}
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                {...(register ? register(id) : {})}
                onChange={onChange}
                className={`${icon ? "pl-10" : ""} ${
                  error ? "border-red-500" : ""
                } ${className}`}
              />
            </div>
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
