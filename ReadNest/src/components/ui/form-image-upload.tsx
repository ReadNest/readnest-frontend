import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowUp, Loader2, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FormImageUploadProps {
  label: string;
  onUpload: (file: File) => void;
  error?: string;
  disabled?: boolean;
  imageUrl?: string;
  isUploading?: boolean;
}

export default function FormImageUpload({
  label,
  onUpload,
  error,
  disabled = false,
  imageUrl,
  isUploading = false,
}: FormImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (imageUrl && !isUploading) {
      e.stopPropagation();
      setPreviewOpen(true);
    }
  };

  return (
    <div className={`space-y-1 relative ${error ? "mb-8" : ""}`}>
      <Label className="block text-left p-1">{label}</Label>

      <TooltipProvider>
        <Tooltip open={!!error}>
          <TooltipTrigger asChild>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !isUploading && inputRef.current?.click()}
              className={cn(
                "w-full border border-dashed border-input rounded-md p-6 text-sm flex flex-col justify-center items-center transition-colors",
                !isUploading &&
                  !disabled &&
                  "hover:border-primary cursor-pointer",
                isDragging ? "border-primary bg-primary/5" : "",
                error && "border-red-500",
                (disabled || isUploading) && "opacity-70 cursor-not-allowed",
                imageUrl && isUploading && "relative"
              )}
            >
              {imageUrl && isUploading && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center rounded-md">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
              )}
              {imageUrl ? (
                <div className="w-full relative group">
                  <img
                    src={imageUrl}
                    alt="Ảnh đã chọn"
                    className="w-full max-h-60 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleImageClick}
                    type="button"
                  >
                    <Maximize2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : isUploading ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Đang tải ảnh lên...
                  </p>
                </div>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ArrowUp className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Kéo ảnh vào đây hoặc{" "}
                    <span
                      className="text-primary font-medium"
                      onClick={handleBrowseClick}
                    >
                      chọn từ thiết bị
                    </span>
                  </p>
                </>
              )}
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

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {/* Image Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-4xl max-h-screen overflow-hidden p-1">
          {imageUrl && (
            <div className="w-full h-full flex items-center justify-center overflow-auto p-1">
              <img
                src={imageUrl}
                alt="Xem ảnh đầy đủ"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
