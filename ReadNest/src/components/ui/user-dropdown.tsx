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
import { Link } from "react-router-dom";

interface UserDropDownProps {
  username: string;
  fullName: string;
  avatarUrl?: string;
  onClickLogout: () => void;
}

const getDropDownItems = (username: string) => [
  {
    icon: <User className="mr-2 h-4 w-4" />,
    content: "Thông tin cá nhân",
    to: `/profile/${username}`,
  },
  {
    icon: <BookMarked className="mr-2 h-4 w-4" />,
    content: "Sách yêu thích",
    to: "/favorites",
  },
  {
    icon: <FileText className="mr-2 h-4 w-4" />,
    content: "Bài viết đã viết",
    to: "/my-posts",
  },
  {
    icon: <List className="mr-2 h-4 w-4" />,
    content: "Danh sách trao đổi",
    to: "/trades",
  },
];

function UserDropDown({ ...props }: UserDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 outline-none transition-all duration-150 
             hover:ring-2 hover:ring-indigo-500 hover:bg-muted/50 hover:scale-105 rounded-full p-1 cursor-pointer hover:shadow-md hover:shadow-indigo-300
"
        >
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
            <div className="text-start flex flex-col">
              <p className="text-sm font-medium">{props.fullName}</p>
              <p className="text-xs text-muted-foreground">@{props.username}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {getDropDownItems(props.username).map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link to={item.to} className="flex items-center cursor-pointer">
              {item.icon}
              <span>{item.content}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 cursor-pointer"
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
