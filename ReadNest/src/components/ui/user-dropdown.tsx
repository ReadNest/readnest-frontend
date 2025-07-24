import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  BookMarked,
  FileText,
  List,
  LogOut,
  User,
  Compass,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePaths";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface UserDropDownProps {
  username: string;
  fullName: string;
  avatarUrl?: string;
  onClickLogout: () => void;
  onlyLogout?: boolean;
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
    to: ROUTE_PATHS.FAVOURITE,
  },
  {
    icon: <FileText className="mr-2 h-4 w-4" />,
    content: "Bài viết đã viết",
    to: ROUTE_PATHS.MY_POSTS,
  },
  {
    icon: <List className="mr-2 h-4 w-4" />,
    content: "Danh sách trao đổi",
    to: ROUTE_PATHS.MY_BOOKS,
  },
  {
    icon: <Compass className="mr-2 h-4 w-4" />,
    content: "Gợi ý sách thông minh",
    to: ROUTE_PATHS.RECOMMENDATIONS,
  },
];

function UserDropDown({ onlyLogout, ...props }: UserDropDownProps) {
  const hasPurchasedPremium = useSelector(
    (state: RootState) => state.auth.user?.hasPurchasedPremium
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 outline-none transition-all duration-150 
             hover:ring-2 hover:ring-indigo-500 hover:bg-muted/50 hover:scale-105 rounded-full p-1 cursor-pointer hover:shadow-md hover:shadow-indigo-300"
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
              {hasPurchasedPremium && (
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded w-fit">
                  <span className="text-yellow-600">👑</span>
                  <span>Thành viên Premium</span>
                </div>
              )}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {!onlyLogout &&
          getDropDownItems(props.username).map((item, index) => (
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
