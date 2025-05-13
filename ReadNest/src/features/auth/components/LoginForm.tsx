import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import type { LoginRequest } from "@/api/@types";
import type { RootState } from "@/store";
import SocialLoginButtons from "./SocialLoginButtons";
import { loginStart } from "../authSlice";
import { clearErrors } from "@/store/error/errorSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { showToastMessage } from "@/lib/utils";

export default function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors: clearFormErrors,
  } = useForm<LoginRequest>();

  const errorFields = useSelector(
    (state: RootState) => state.error.detailErrors
  );
  const errorMessage = useSelector((state: RootState) => state.error);

  const onSubmit = (data: LoginRequest) => {
    dispatch(clearErrors());
    dispatch(loginStart(data));
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("userName", e.target.value);

    clearFormErrors("userName");

    if (errorFields["userName"]) {
      dispatch(clearErrors());
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", e.target.value);

    clearFormErrors("password");

    if (errorFields["password"]) {
      dispatch(clearErrors());
    }
  };

  useEffect(() => {
    showToastMessage({
      message: errorMessage.message ?? "",
      messageId: errorMessage.messageId,
    });
  }, [errorMessage]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <div
        className={`space-y-1 relative ${
          errors.userName || errorFields["userName"] ? "mb-8" : ""
        }`}
      >
        <Label htmlFor="userName" className="block text-left p-1">
          Địa chỉ Email
        </Label>
        <TooltipProvider>
          <Tooltip open={!!(errors.userName || errorFields["userName"])}>
            <TooltipTrigger asChild>
              <Input
                id="userName"
                placeholder="Nhập địa chỉ Email của bạn"
                {...register("userName", {
                  required: "Email không được để trống",
                })}
                onChange={handleUserNameChange}
                className={
                  errors.userName || errorFields["userName"]
                    ? "border-red-500"
                    : ""
                }
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              className="bg-red-500 text-white border-red-500"
            >
              {errors.userName?.message || errorFields["userName"]}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className={`space-y-1 relative ${
          errors.password || errorFields["password"] ? "mb-8" : ""
        }`}
      >
        <Label htmlFor="password" className="block text-left p-1">
          Mật khẩu
        </Label>
        <TooltipProvider>
          <Tooltip open={!!(errors.password || errorFields["password"])}>
            <TooltipTrigger asChild>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                })}
                onChange={handlePasswordChange}
                className={
                  errors.password || errorFields["password"]
                    ? "border-red-500"
                    : ""
                }
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              className="bg-red-500 text-white border-red-500"
            >
              {errors.password?.message || errorFields["password"]}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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

      <SocialLoginButtons />
    </form>
  );
}
