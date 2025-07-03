import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import MultiImageUploader from "@/components/ui/MultiImageUploader";
import { TinyMCETextEditor } from "@/components/rich-text-editor/TinyMCETextEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookSearchBox from "@/features/bookExchange/components/BookSearchBox";
import type { CreateTradingPostRequest } from "@/api/@types";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "@/features/bookExchange/tradingPostSlice";
import type { RootState } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePaths";

interface TradingPostFormProps {
  onSubmit: (data: CreateTradingPostRequest) => void;
  defaultValues?: Partial<CreateTradingPostRequest>;
  isSubmitting?: boolean;
}

export default function TradingPostForm({
  onSubmit,
  defaultValues,
  isSubmitting = false,
}: TradingPostFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tradingPost = useSelector(
    (state: RootState) => state.tradingPost.tradingPostValue
  );
  const isSuccess = useSelector(
    (state: RootState) => state.tradingPost.isSuccess
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<CreateTradingPostRequest>({
    defaultValues: {
      ...(tradingPost || {}),
      ...(defaultValues || {}),
    },
    mode: "onSubmit",
  });

  const [showRequestBookModal, setShowRequestBookModal] = useState(false);
  const images = watch("images") || [];

  const handleDetailImagesChange = (imageUrls: string[]) => {
    const mapped = imageUrls.map((url, index) => ({
      imageUrl: url,
      order: index,
    }));
    setValue("images", mapped, { shouldValidate: true });
  };

  const handleFormSubmit = (data: CreateTradingPostRequest) => {
    if (onSubmit) onSubmit(data);
  };

  // Reset form khi submit thành công
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetState());
      navigate(ROUTE_PATHS.MY_BOOKS);
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 max-w-2xl w-full"
    >
      {/* Tiêu đều */}
      <FormField
        id="title"
        label="Tiêu đề"
        placeholder="Tiêu đề... ví dụ: Sách cũ cần trao đổi"
        {...register("title", { required: "Vui lòng nhập tiêu đề" })}
        error={errors.title?.message}
        onChange={(e) => {
          setValue("title", e.target.value, { shouldValidate: false });
          clearErrors("title");
        }}
      />

      {/* Chọn sách */}
      <div>
        <Label htmlFor={"bookId"} className="block text-left p-1">
          Chọn sách muốn đăng
        </Label>
        <Controller
          control={control}
          name="bookId"
          rules={{ required: "Vui lòng chọn sách" }}
          render={({ field }) => (
            <>
              <BookSearchBox
                value={field.value ?? ""}
                onChange={(val) => {
                  field.onChange(val);
                  clearErrors("bookId");
                }}
                placeholder="Tìm kiếm sách trong hệ thống..."
              />
              <div className="relative">
                <div className="absolute left-0 top-0">
                  <TooltipProvider>
                    <Tooltip open={!!errors.bookId}>
                      <TooltipTrigger asChild>
                        <div className="w-0 h-0" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        align="start"
                        className="bg-red-500 text-white border-red-500"
                      >
                        {errors.bookId?.message}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </>
          )}
        />
        <Button
          type="button"
          onClick={() => setShowRequestBookModal(true)}
          className="ml-2 text-xs mt-2 bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Không tìm thấy sách?
        </Button>
      </div>

      <div>
        <Label className="block text-left p-1">Ảnh hiện trạng sách</Label>
        <Controller
          control={control}
          name="images"
          rules={{
            validate: (imgs) =>
              imgs && imgs.length > 0 ? true : "Vui lòng thêm ít nhất 1 ảnh",
          }}
          render={() => (
            <>
              <MultiImageUploader
                images={images.map((img) => img.imageUrl ?? "")}
                setImages={(urls) => {
                  handleDetailImagesChange(urls);
                  clearErrors("images");
                }}
              />
              <div className="relative">
                <div className="absolute left-0 top-0">
                  <TooltipProvider>
                    <Tooltip open={!!errors.images}>
                      <TooltipTrigger asChild>
                        <div className="w-0 h-0" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        align="start"
                        className="bg-red-500 text-white border-red-500"
                      >
                        {(errors.images as { message?: string })?.message}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </>
          )}
        />
        {errors.images && (
          <div className="text-red-500 text-xs mt-1">
            {(errors.images as { message?: string })?.message}
          </div>
        )}
      </div>

      {/* Tình trạng sách */}
      <FormField
        id="condition"
        label="Tình trạng sách"
        placeholder="Như mới, cũ, có ghi chú..."
        {...register("condition", {
          required: "Vui lòng nhập tình trạng sách",
        })}
        error={errors.condition?.message}
        onChange={(e) => {
          setValue("condition", e.target.value, { shouldValidate: false });
          clearErrors("condition");
        }}
      />

      {/* Mô tả chi tiết */}
      <div>
        <Label className="block text-left p-1">Mô tả</Label>
        <Controller
          control={control}
          name="shortDescription"
          rules={{ required: "Vui lòng nhập mô tả" }}
          render={({ field }) => (
            <>
              <TinyMCETextEditor
                value={field.value ?? ""}
                onChange={(val) => {
                  field.onChange(val);
                  clearErrors("shortDescription");
                }}
              />
              <div className="relative">
                <div className="absolute left-0 top-0">
                  <TooltipProvider>
                    <Tooltip open={!!errors.shortDescription}>
                      <TooltipTrigger asChild>
                        <div className="w-0 h-0" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        align="start"
                        className="bg-red-500 text-white border-red-500"
                      >
                        {errors.shortDescription?.message}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </>
          )}
        />
        {errors.shortDescription && (
          <div className="text-red-500 text-xs mt-1">
            {errors.shortDescription.message}
          </div>
        )}
      </div>

      {/* Lời nhắn */}
      <FormField
        id="messageToRequester"
        label="Lời nhắn"
        placeholder="Lời nhắn cho người muốn trao đổi"
        {...register("messageToRequester")}
        error={errors.messageToRequester?.message}
        onChange={(e) => {
          setValue("messageToRequester", e.target.value, {
            shouldValidate: false,
          });
          clearErrors("messageToRequester");
        }}
      />

      <Dialog
        open={showRequestBookModal}
        onOpenChange={setShowRequestBookModal}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yêu cầu admin tạo sách mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <FormField
              id="externalBookUrl"
              label="Link sách (Tiki, Fahasa, Goodreads...)"
              placeholder="Dán link sách từ Tiki, Fahasa, Goodreads..."
              {...register("externalBookUrl")}
              error={errors.externalBookUrl?.message}
              required
              onChange={(e) => {
                setValue("externalBookUrl", e.target.value, {
                  shouldValidate: false,
                });
                clearErrors("externalBookUrl");
              }}
            />
            <FormField
              id="message"
              label="Lý do hoặc mô tả thêm cho admin"
              placeholder="Lý do hoặc mô tả thêm cho admin"
              className="min-h-[80px]"
              {...register("message")}
              error={errors.message?.message}
              required
              onChange={(e) => {
                setValue("message", e.target.value, { shouldValidate: false });
                clearErrors("message");
              }}
            />
            <Button
              type="button"
              onClick={() => setShowRequestBookModal(false)}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Gửi yêu cầu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
        disabled={isSubmitting}
      >
        {defaultValues ? "Cập nhật bài đăng" : "Tạo bài đăng"}
      </Button>
    </form>
  );
}
