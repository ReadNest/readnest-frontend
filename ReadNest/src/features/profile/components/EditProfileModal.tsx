"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ProfileForm } from "./ProfileForm";

type ProfileData = {
    fullName: string;
    dateOfBirth: string;
    bio: string;
    address: string;
};

export function EditProfileModal({ profileData }: { profileData: ProfileData }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                onClick={() => setIsOpen(true)}
            >
                Chỉnh sửa hồ sơ
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">Chỉnh sửa thông tin cá nhân</DialogTitle>
                    </DialogHeader>
                    <ProfileForm
                        onClose={() => setIsOpen(false)}
                        initialData={profileData} // Truyền dữ liệu profile vào
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}