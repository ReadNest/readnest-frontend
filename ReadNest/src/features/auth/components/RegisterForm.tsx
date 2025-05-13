import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { clearErrors } from "@/store/error/errorSlice";
import type { RootState } from "@/store";
import type { RegisterRequest } from "@/api/@types";
import FormField from "@/components/ui/form-field";
import FormDateField from "@/components/ui/form-date-field";
import { showToastMessage } from "@/lib/utils";
import { registerStart } from "@/features/auth/authSlice";
import { format } from "date-fns";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterRequest>();

  const isRegisterSuccess = useSelector(
    (state: RootState) => state.auth.isRegisterSuccess
  );
  const errorFields = useSelector(
    (state: RootState) => state.error.detailErrors
  );
  const errorMessage = useSelector((state: RootState) => state.error);

  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  const onSubmit = (data: RegisterRequest) => {
    dispatch(clearErrors());
    const formattedDate = format(dateOfBirth ?? "", "yyyy-MM-dd");
    dispatch(registerStart({ ...data, dateOfBirth: formattedDate }));
  };

  useEffect(() => {
    showToastMessage({
      message: errorMessage.message ?? "",
      messageId: errorMessage.messageId,
    });
  }, [errorMessage]);

  useEffect(() => {
    if (isRegisterSuccess) {
      reset();
      setDateOfBirth(new Date());
    }
  }, [isRegisterSuccess, reset]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <FormField
        id="userName"
        label="Username"
        placeholder="Nhập username"
        error={errors.userName?.message || errorFields["userName"]}
        register={register}
      />

      <FormField
        id="email"
        label="Email"
        placeholder="Nhập email"
        error={errors.email?.message || errorFields["email"]}
        register={register}
      />

      <FormField
        id="fullName"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        error={errors.fullName?.message || errorFields["fullName"]}
        register={register}
      />

      <FormField
        id="address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ"
        error={errors.address?.message || errorFields["address"]}
        register={register}
      />

      <FormDateField
        label="Ngày sinh"
        date={dateOfBirth}
        setDate={setDateOfBirth}
        error={errorFields["dateOfBirth"]}
      />

      <FormField
        id="password"
        type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        error={errors.password?.message || errorFields["password"]}
        register={register}
      />

      <FormField
        id="confirmPassword"
        type="password"
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        error={
          errors.confirmPassword?.message || errorFields["confirmPassword"]
        }
        register={register}
      />

      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
      >
        Tạo tài khoản
      </Button>
    </form>
  );
}
