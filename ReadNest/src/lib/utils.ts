import type { DetailError } from "@/lib/api/base/types";
import { clsx, type ClassValue } from "clsx";
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
