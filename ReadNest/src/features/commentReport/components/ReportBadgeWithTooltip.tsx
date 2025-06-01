"use client";

import type { CommentReportReponse } from "@/api/@types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface ReportBadgeWithTooltipProps {
  reports: CommentReportReponse[];
}

export function ReportBadgeWithTooltip({ reports }: ReportBadgeWithTooltipProps) {
  return (
    <span className="text-base text-gray-600">
      <strong>Số lượt báo cáo:</strong>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="ml-1 text-red-600 border border-red-200 bg-red-50 rounded px-3 py-1 font-bold cursor-pointer text-base">
              {reports.length} lượt
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-white shadow-2xl max-w-xl w-[500px] p-4 rounded-xl">
            <div className="text-base font-bold mb-2 text-violet-700">Chi tiết báo cáo:</div>
            <ul className="space-y-2">
              {reports.map((report, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 bg-violet-50 rounded-lg px-3 py-2"
                >
                  <Avatar className="w-8 h-8 rounded-full border">
                    <AvatarImage src={report.reporter?.avatarUrl ?? ""} alt={report.reporter?.fullName ?? "Người dùng ẩn danh"} />
                    <AvatarFallback className="bg-gray-200 text-sm">
                      {report.reporter?.fullName ?? "Người dùng ẩn danh"
                        .split(" ")
                        .map((part: string) => part[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-violet-700">{report.reporter?.fullName ?? "Người dùng ẩn danh"}:</span>
                  <span className="text-gray-800">{report.reason}</span>
                </li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
}