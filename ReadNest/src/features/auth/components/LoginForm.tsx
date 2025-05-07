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
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Username */}
        <div className="space-y-1">
          <Label htmlFor="userName" className="block text-left">
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

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password" className="block text-left">
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

        {/* Forgot password */}
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

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
