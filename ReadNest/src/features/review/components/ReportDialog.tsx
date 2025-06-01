"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ReportDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    reportReason: string;
    onReportReasonChange: (reason: string) => void;
    onSubmit: () => void;
}

export function ReportDialog({
    isOpen,
    onOpenChange,
    reportReason,
    onReportReasonChange,
    onSubmit,
}: ReportDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Báo cáo bình luận</DialogTitle>
                </DialogHeader>

                <Textarea
                    placeholder="Nhập lý do bạn muốn báo cáo bình luận này..."
                    value={reportReason}
                    onChange={(e) => onReportReasonChange(e.target.value)}
                    className="min-h-[100px]"
                />

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onSubmit}
                    >
                        Gửi báo cáo
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}