import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import FormImageUpload from "@/components/ui/form-image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateBookRequest } from "@/api/@types";
import { showToastMessage, uploadFileToCloudinary } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { clearErrors } from "@/store/error/errorSlice";
import { TinyMCETextEditor } from "@/components/rich-text-editor/TinyMCETextEditor";
import { toast } from "react-toastify";
import { fetchCategoriesStart } from "@/features/category/categorySlice";
import { LazyMultiSelectCombobox } from "@/components/ui/LazyMultiSelectCombobox";

interface BookFormProps {
  defaultValues?: Partial<CreateBookRequest>;
  onSubmit: (data: CreateBookRequest) => void;
  isSubmitting?: boolean;
}

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
    clearErrors: clearFormErrors,
  } = useForm<CreateBookRequest>({
    defaultValues: {
      title: "",
      author: "",
      rating: 1,
      isbn: "",
      language: "",
      categoryIds: [],
      imageUrl: "",
      description: "",
      ...defaultValues,
    },
  });

  const dispatch = useDispatch();
  const errorFields = useSelector(
    (state: RootState) => state.error.detailErrors
  );
  const errorMessage = useSelector((state: RootState) => state.error);
  const categoryState = useSelector((state: RootState) => state.categories);
  const { pageIndex, pageSize, totalItems } = categoryState.pagingInfo;
  const categories = categoryState.categories;

  const [isUploading, setIsUploading] = useState(false);

  const handleUploadImage = async (file: File) => {
    dispatch(clearErrors());

    try {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước file không được vượt quá 5MB");
        return;
      }

      setIsUploading(true);

      const response = await uploadFileToCloudinary(file);

      setValue("imageUrl", response);
    } catch {
      toast.error("Lỗi trong quá trình upload file ảnh");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    dispatch(
      fetchCategoriesStart({
        pageIndex: 1,
        pageSize: 10,
      })
    );
  }, [dispatch]);

  const handleFormSubmit = (data: CreateBookRequest) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    showToastMessage({
      message: errorMessage.message ?? "",
      messageId: errorMessage.messageId,
    });
  }, [errorMessage]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("title", e.target.value);
    clearFormErrors("title");
    if (errorFields["title"]) {
      dispatch(clearErrors());
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("author", e.target.value);
    clearFormErrors("author");
    if (errorFields["author"]) {
      dispatch(clearErrors());
    }
  };

  // const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue("description", e.target.value);
  //   clearFormErrors("description");
  //   if (errorFields["description"]) {
  //     dispatch(clearErrors());
  //   }
  // };

  const handleISBNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isbn", e.target.value);
    clearFormErrors("isbn");
    if (errorFields["iSBN"]) {
      dispatch(clearErrors());
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("imageUrl", e.target.value);
    clearFormErrors("imageUrl");
    if (errorFields["imageUrl"]) {
      dispatch(clearErrors());
    }
  };

  const handleFetchMoreCategories = (nextPage: number) => {
    dispatch(
      fetchCategoriesStart({
        pageIndex: nextPage,
        pageSize: pageSize || 10,
      })
    );
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
          error={errors.title?.message || errorFields["title"]}
          register={register}
          onChange={handleTitleChange}
        />
        <FormField
          id="author"
          label="Tác giả"
          placeholder="Nhập tên tác giả"
          error={errors.author?.message || errorFields["author"]}
          register={register}
          onChange={handleAuthorChange}
        />
      </div>

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
          error={errors.isbn?.message || errorFields["iSBN"]}
          register={register}
          onChange={handleISBNChange}
        />
      </div>

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
              <LazyMultiSelectCombobox
                values={field.value || []}
                onChange={field.onChange}
                data={categories}
                displayField="name"
                valueField="id"
                fetchMoreData={handleFetchMoreCategories}
                pageIndex={pageIndex ?? 1}
                pageSize={pageSize ?? 10}
                totalItems={totalItems ?? 10}
                placeholder="Chọn thể loại"
              />
            )}
          />
        </div>
      </div>

      <FormImageUpload
        label="Ảnh bìa"
        onUpload={handleUploadImage}
        error={errors.imageUrl?.message || errorFields["imageUrl"]}
        imageUrl={watch("imageUrl") ?? ""}
        disabled={isSubmitting}
        isUploading={isUploading}
        onChange={handleImageUrlChange}
      />

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Mô tả
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TinyMCETextEditor
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
      </div>

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
