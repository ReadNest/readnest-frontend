/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileRequested } from "@/features/profile/profileSlice";

type ProfileData = {
  userId?: string;
  fullName: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  bio: string;
  address: string;
};

type ProfileFormProps = {
  onClose: () => void;
  initialData?: ProfileData; // Thêm prop initialData
};

export function ProfileForm({ onClose, initialData }: ProfileFormProps) {
  const { user } = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileData>({
    defaultValues: initialData || {
      // Sử dụng initialData nếu có
      fullName: "",
      dateOfBirth: "",
      bio: "",
      address: "",
    },
  });

  // Redux
  const dispatch = useDispatch();

  const onSubmit = (data: ProfileData) => {
    data.userId = user?.userId;
    console.log("data", data);
    dispatch(updateProfileRequested(data));
    onClose();
  };

  // Reset form với initialData mỗi khi nó thay đổi
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Họ và tên</label>
        <input
          {...register("fullName", {
            required: "Vui lòng nhập họ tên",
            minLength: {
              value: 2,
              message: "Họ và tên phải có ít nhất 2 ký tự",
            },
            maxLength: {
              value: 25,
              message: "Họ và tên không được vượt quá 25 ký tự",
            },
            pattern: {
              value: /^[a-zA-ZÀ-ỹ\s'.-]+$/u,
              message: "Họ và tên không hợp lệ",
            },
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Nhập họ và tên"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Ngày sinh</label>
        <input
          type="date"
          {...register("dateOfBirth", {
            required: "Vui lòng nhập ngày sinh",
            validate: (value) => {
              if (!value) return "Vui lòng nhập ngày sinh";
              const selected = new Date(value);
              const today = new Date();
              if (selected > today) return "Ngày sinh không hợp lệ";
              // Kiểm tra tuổi phải lớn hơn 13
              const age = today.getFullYear() - selected.getFullYear();
              const m = today.getMonth() - selected.getMonth();
              const d = today.getDate() - selected.getDate();
              const isBirthdayPassed = m > 0 || (m === 0 && d >= 0);
              const realAge = isBirthdayPassed ? age : age - 1;
              if (realAge < 13) return "Bạn phải trên 13 tuổi";
              return true;
            },
          })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Giới thiệu</label>
        <textarea
          {...register("bio")}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
          placeholder="Mô tả về bản thân"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Địa chỉ</label>
        <input
          {...register("address")}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Nhập địa chỉ"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Lưu thay đổi
        </Button>
        <Button variant="outline" type="button" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </form>
  );
}
