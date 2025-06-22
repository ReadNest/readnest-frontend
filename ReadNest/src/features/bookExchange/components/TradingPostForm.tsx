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
import {
  createTradingPostStart,
  setTradingPost,
} from "@/features/bookExchange/tradingPostSlice";
import type { RootState } from "@/store";

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
  const tradingPost = useSelector(
    (state: RootState) => state.tradingPost.tradingPostValue
  );
  const isSuccess = useSelector(
    (state: RootState) => state.tradingPost.isSuccess
  );

  const { register, handleSubmit, control, setValue, watch, reset } =
    useForm<CreateTradingPostRequest>({
      defaultValues: {
        ...(tradingPost || {}),
        ...(defaultValues || {}),
      },
    });

  const [showRequestBookModal, setShowRequestBookModal] = useState(false);
  const images = watch("images") || [];

  const handleDetailImagesChange = (imageUrls: string[]) => {
    const mapped = imageUrls.map((url, index) => ({
      imageUrl: url,
      ordere: index,
    }));
    setValue("images", mapped);
  };

  const handleFormSubmit = (data: CreateTradingPostRequest) => {
    if (onSubmit) onSubmit(data);
  };

  useEffect(() => {
    if (defaultValues) reset({ ...tradingPost, ...defaultValues });
    else reset(tradingPost);
  }, [defaultValues, tradingPost, reset]);

  // Reset form khi submit thành công
  useEffect(() => {
    if (isSuccess) {
      reset();
      dispatch(setTradingPost({}));
    }
  }, [isSuccess, reset, dispatch]);

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
        onChange={(e) => setValue("title", e.target.value)}
        register={register}
      />

      {/* Chọn sách */}
      <div>
        <Label htmlFor={"bookId"} className="block text-left p-1">
          Chọn sách muốn đăng
        </Label>
        <Controller
          control={control}
          name="bookId"
          render={({ field }) => (
            <BookSearchBox
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder="Tìm kiếm sách trong hệ thống..."
            />
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
          render={() => (
            <MultiImageUploader
              images={images.map((img) => img.imageUrl ?? "")}
              setImages={handleDetailImagesChange}
            />
          )}
        />
      </div>

      {/* Tình trạng sách */}
      <FormField
        id="condition"
        label="Tình trạng sách"
        placeholder="Như mới, cũ, có ghi chú..."
        onChange={(e) => setValue("condition", e.target.value)}
        register={register}
      />

      {/* Mô tả chi tiết */}
      <div>
        <Label className="block text-left p-1">Mô tả</Label>
        <Controller
          control={control}
          name="shortDescription"
          render={({ field }) => (
            <TinyMCETextEditor
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Lời nhắn */}
      <FormField
        id="messageToRequester"
        label="Lời nhắn"
        placeholder="Lời nhắn cho người muốn trao đổi"
        register={register}
        onChange={(e) => setValue("messageToRequester", e.target.value)}
      />

      {/* Modal yêu cầu admin tạo sách mới */}
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
              register={register}
              onChange={(e) => setValue("externalBookUrl", e.target.value)}
              required
            />
            <FormField
              id="message"
              label="Lý do hoặc mô tả thêm cho admin"
              placeholder="Lý do hoặc mô tả thêm cho admin"
              className="min-h-[80px]"
              register={register}
              onChange={(e) => setValue("message", e.target.value)}
              required
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
