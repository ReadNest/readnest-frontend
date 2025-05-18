import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormImageUpload from "@/components/ui/form-image-upload";
import RichTextEditor from "@/components/rich-text-editor/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateBookRequest } from "@/api/@types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, uploadFileToCloudinary } from "@/lib/utils";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface BookFormProps {
  defaultValues?: Partial<CreateBookRequest>;
  onSubmit: (data: CreateBookRequest) => void;
  isSubmitting?: boolean;
}

const categories = [
  { id: "fiction", label: "Fiction" },
  { id: "non-fiction", label: "Non-fiction" },
  { id: "science", label: "Science" },
  { id: "history", label: "History" },
];

export default function BookForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    reset,
  } = useForm<CreateBookRequest>({
    defaultValues,
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleUploadImage = async (file: File) => {
    try {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước file không được vượt quá 5MB");
        return;
      }

      setIsUploading(true);

      const response = await uploadFileToCloudinary(file);

      setValue("imageUrl", response);
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: CreateBookRequest) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 max-w-2xl w-full"
    >
      {/* Title & Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="title"
          label="Tiêu đề"
          placeholder="Nhập tiêu đề"
          error={errors.title?.message}
          register={register}
        />
        <FormField
          id="author"
          label="Tác giả"
          placeholder="Nhập tên tác giả"
          error={errors.author?.message}
          register={register}
        />
      </div>

      {/* Rating & ISBN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Đánh giá
          </label>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value + ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đánh giá" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <SelectItem key={r} value={r.toString()}>
                      {r} sao
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <FormField
          id="isbn"
          label="ISBN"
          placeholder="Nhập ISBN"
          error={errors.isbn?.message}
          register={register}
        />
      </div>

      {/* Language & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Ngôn ngữ
          </label>
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Thể loại
          </label>
          <Controller
            control={control}
            name="categoryIds"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {field.value?.length
                      ? categories
                          .filter((cat) => field?.value?.includes(cat.id))
                          .map((cat) => cat.label)
                          .join(", ")
                      : "Chọn thể loại"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-100",
                        field.value?.includes(category.id) && "bg-gray-100"
                      )}
                      onClick={() => {
                        const newValue = field.value?.includes(category.id)
                          ? field.value.filter((id) => id !== category.id)
                          : [...(field.value || []), category.id];
                        field.onChange(newValue);
                      }}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          field.value?.includes(category.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span>{category.label}</span>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>

      {/* Image Upload */}
      <FormImageUpload
        label="Ảnh bìa"
        onUpload={handleUploadImage}
        error={errors.imageUrl?.message}
        imageUrl={watch("imageUrl") ?? ""}
        disabled={isSubmitting}
        isUploading={isUploading}
      />

      {/* RichTextEditor for Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Mô tả
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <RichTextEditor
              content={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
        disabled={isSubmitting}
      >
        {defaultValues ? "Cập nhật sách" : "Thêm sách"}
      </Button>
    </form>
  );
}
