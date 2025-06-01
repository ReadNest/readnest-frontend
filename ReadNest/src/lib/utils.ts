import type { DetailError } from "@/lib/api/base/types";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapDetailErrorsToFieldState(
  detailErrorList: DetailError[]
): Record<string, string> {
  const obj: Record<string, string> = {};
  if (!detailErrorList) return obj;
  detailErrorList.forEach((detailError: DetailError) => {
    if (detailError.field) obj[detailError.field] = detailError.message;
  });

  return obj;
}

export function normalizeFieldName(field: string): string {
  return field.charAt(0).toLowerCase() + field.slice(1);
}

export function showToastMessage({
  message,
  messageId,
}: {
  message: string;
  messageId: string;
}) {
  if (messageId.startsWith("I")) toast.success(message);
  else if (messageId.startsWith("E")) toast.error(message);
  else if (messageId.startsWith("W")) toast.warning(message);
}

export function isTokenValid(token: string): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function getInitials(fullName: string) {
  const parts = fullName.trim().split(" ");
  const lastTwo = parts.slice(-2);
  return lastTwo.map((word) => word[0]?.toUpperCase() ?? "").join("");
}

export const uploadFileToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_URL,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.secure_url;
  } catch {
    toast.error("Error uploading to Cloudinary");
  }
};

export const formatTimeAgo = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return 'vừa xong';
  }

  // Less than 1 hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  // Less than 24 hours
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  // Less than 7 days
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 7) {
    return `${diffInDays} ngày trước`;
  }

  // More than 7 days - show formatted date
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};