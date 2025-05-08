import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { setInitialState } from "../authSlice";
import { Link } from "react-router-dom";

import type { LoginRequest } from "@/api/@types";
import type { RootState } from "@/store";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const errorFields = useSelector(
    (state: RootState) => state.error.detailErrors
  );
  const errorMessage = useSelector((state: RootState) => state.error.message);

  const onSubmit = (data: LoginRequest) => {
    dispatch(setInitialState(data));
  };

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-5"
    >
      <div className="space-y-1">
        <Label htmlFor="userName" className="block text-left p-1">
          Địa chỉ Email
        </Label>
        <Input
          id="userName"
          placeholder="Nhập địa chỉ Email của bạn"
          {...register("userName", { required: "Email không được để trống" })}
          className={
            errors.userName || errorFields["userName"] ? "border-red-500" : ""
          }
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
        {errorFields["userName"] && (
          <p className="text-sm text-red-500">{errorFields["userName"]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="block text-left p-1">
          Mật khẩu
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          {...register("password", {
            required: "Mật khẩu không được để trống",
          })}
          className={
            errors.password || errorFields["password"] ? "border-red-500" : ""
          }
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        {errorFields["password"] && (
          <p className="text-sm text-red-500">{errorFields["password"]}</p>
        )}
      </div>

      <div className="text-left text-sm">
        <p>
          Quên mật khẩu?{" "}
          <Link
            to="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Ấn vào
          </Link>
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
      >
        Đăng nhập
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm text-muted-foreground">
          <span className="bg-white px-2 text-gray-500">
            Hoặc đăng nhập với
          </span>
        </div>
      </div>

      <SocialLoginButtons />
    </form>
  );
}
