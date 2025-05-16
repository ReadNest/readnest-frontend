import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { BookMarked, FileText, List, LogOut, User } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface UserDropDownProps {
  fullName: string;
  avatarUrl?: string;
  onClickLogout: () => void;
}

function UserDropDown({ ...props }: UserDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 outline-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={props.avatarUrl} />
            <AvatarFallback>{getInitials(props.fullName)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={props.avatarUrl} />
              <AvatarFallback>{getInitials(props.fullName)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium leading-none">{props.fullName}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Thông tin cá nhân</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <BookMarked className="mr-2 h-4 w-4" />
          <span>Sách yêu thích</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <FileText className="mr-2 h-4 w-4" />
          <span>Bài viết đã viết</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <List className="mr-2 h-4 w-4" />
          <span>Danh sách trao đổi</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={props.onClickLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropDown;
