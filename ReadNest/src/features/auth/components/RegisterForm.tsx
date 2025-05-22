import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { clearErrors } from "@/store/error/errorSlice";
import type { RootState } from "@/store";
import type { RegisterRequest } from "@/api/@types";
import FormField from "@/components/ui/form-field";
import FormDateField from "@/components/ui/form-date-field";
import { showToastMessage } from "@/lib/utils";
import { registerStart } from "@/features/auth/authSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { User, Mail, MapPin, Lock, ShieldCheck, Signature } from "lucide-react";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RegisterRequest>({
    defaultValues: {
      dateOfBirth: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const isRegisterSuccess = useSelector(
    (state: RootState) => state.auth.isRegisterSuccess
  );
  const errorFields = useSelector(
    (state: RootState) => state.error.detailErrors
  );
  const errorMessage = useSelector((state: RootState) => state.error);

  const dateOfBirth = watch("dateOfBirth");
  const onDateChange = (date?: Date) => {
    setValue("dateOfBirth", format(date ?? new Date(), "yyyy-MM-dd"));
  };

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
      navigate("/login");
      dispatch(clearErrors());
    }
  }, [isRegisterSuccess, reset, navigate, dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <FormField
        id="userName"
        label="Tên đăng nhập"
        placeholder="Nhập tên đăng nhập"
        error={errors.userName?.message || errorFields["userName"]}
        register={register}
        icon={<User className="w-4 h-4" />}
        required
      />

      <FormField
        id="email"
        label="Email"
        placeholder="Nhập email"
        error={errors.email?.message || errorFields["email"]}
        register={register}
        icon={<Mail className="w-4 h-4" />}
        required
      />

      <FormField
        id="fullName"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        error={errors.fullName?.message || errorFields["fullName"]}
        register={register}
        icon={<Signature className="w-4 h-4" />}
        required
      />

      <FormField
        id="address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ"
        error={errors.address?.message || errorFields["address"]}
        register={register}
        icon={<MapPin className="w-4 h-4" />}
        required
      />

      <FormDateField
        label="Ngày sinh"
        date={dateOfBirth ? new Date(dateOfBirth) : undefined}
        setDate={onDateChange}
        error={errorFields["dateOfBirth"]}
        showQuickOptions={false}
        required
      />

      <FormField
        id="password"
        type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        error={errors.password?.message || errorFields["password"]}
        register={register}
        icon={<Lock className="w-4 h-4" />}
        required
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
        icon={<ShieldCheck className="w-4 h-4" />}
        required
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
