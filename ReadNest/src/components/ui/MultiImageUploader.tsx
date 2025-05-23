/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFileToCloudinary } from "@/lib/utils";
import { toast } from "react-toastify";
import { ArrowUp, Loader2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

interface MultiImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
  disabled?: boolean;
}

export default function MultiImageUploader({
  images,
  setImages,
  disabled = false,
}: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return;
      setIsUploading(true);
      try {
        const uploads = await Promise.all(
          acceptedFiles.map(async (file) => {
            if (file.size > 5 * 1024 * 1024) {
              toast.error(`${file.name} vượt quá 5MB`);
              return null;
            }
            return await uploadFileToCloudinary(file);
          })
        );
        const validUrls = uploads.filter(Boolean) as string[];
        setImages([...images, ...validUrls]);
      } catch {
        toast.error("Lỗi khi upload ảnh");
      } finally {
        setIsUploading(false);
      }
    },
    [images, setImages, disabled]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    disabled,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "w-full border border-dashed border-input rounded-md p-6 text-sm flex flex-col justify-center items-center transition-colors",
          !isUploading && !disabled && "hover:border-primary cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "",
          (disabled || isUploading) && "opacity-70 cursor-not-allowed"
        )}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <input {...getInputProps()} ref={inputRef} />
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Đang tải ảnh lên...</p>
          </div>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <ArrowUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Kéo ảnh vào đây hoặc{" "}
              <span className="text-primary font-medium">chọn từ thiết bị</span>
            </p>
          </>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              className="flex gap-2 overflow-x-auto py-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {images.map((url, index) => (
                <Draggable key={url} draggableId={url} index={index}>
                  {(provided) => (
                    <div
                      className="relative w-24 h-24 border rounded-md overflow-hidden group"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img
                        src={url}
                        alt={`Image-${index}`}
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => setPreviewImage(url)}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                        onClick={() => handleRemove(index)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="p-0 bg-transparent border-none max-w-[95vw] sm:max-w-6xl flex items-center justify-center">
          {previewImage && (
            <div className="relative group flex justify-center items-center w-full">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl transition-all duration-300 transform group-hover:shadow-3xl"
              />

              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                aria-label="Close preview"
              >
                <X className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
