import type { DetailError } from "@/lib/api/base/types";
import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
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
