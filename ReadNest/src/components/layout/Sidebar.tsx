import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Book,
  LinkIcon,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Home,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RoleEnum } from "@/constants/enum";
import readnestLogo from "@/assets/readnest_logo.svg";
import { ROUTE_PATHS } from "@/constants/routePaths";

interface SidebarProps {
  roleName: string;
}

const adminSidebarItems = [
  {
    label: "Management",
    icon: <LayoutDashboard size={18} />,
    key: "management",
    items: [
      { label: "Overview", path: "/dashboard/overview" },
      { label: "Statistics", path: "/dashboard/stats" },
    ],
  },
  {
    label: "Books",
    icon: <Book size={18} />,
    key: "books",
    items: [
      { label: "All Books", path: ROUTE_PATHS.BOOK },
      { label: "Add New", path: ROUTE_PATHS.MANAGE_BOOK },
    ],
  },
  {
    label: "Affiliate",
    icon: <LinkIcon size={18} />,
    key: "affiliate",
    items: [
      { label: "All Links", path: ROUTE_PATHS.AFFILIATE },
      { label: "Create New", path: ROUTE_PATHS.MANAGE_AFFILIATE },
    ],
  },
];

const settingsItems = [
  {
    label: "Settings",
    icon: <Settings size={18} />,
    key: "settings",
    items: [
      { label: "Profile", path: "/settings/profile" },
      { label: "Security", path: "/settings/security" },
    ],
  },
];

export default function Sidebar({ roleName }: SidebarProps) {
  const navigate = useNavigate();
  const sidebarItems = roleName === RoleEnum.USER ? adminSidebarItems : [];
  const [open, setOpen] = useState<Record<string, boolean>>({
    management: true,
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#0F172A] text-gray-200">
      <div className="p-4 border-b border-gray-700">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={readnestLogo}
            className="w-8 h-8 rounded-full bg-white p-1"
            alt="logo"
          />
          <span className="text-lg font-semibold">ReadNest Admin</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 hover:bg-[#1E293B] text-gray-200"
            onClick={() => navigate("/dashboard")}
          >
            <Home size={18} />
            Dashboard Home
          </Button>
        </div>

        <Separator className="bg-gray-700" />

        <div className="space-y-1">
          {sidebarItems.map((section) => (
            <Collapsible
              key={section.key}
              open={open[section.key]}
              onOpenChange={(value) =>
                setOpen((prev) => ({ ...prev, [section.key]: value }))
              }
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-3 hover:bg-[#1E293B] text-gray-200"
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    {section.label}
                  </div>
                  {open[section.key] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-10 mt-1 space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block text-sm px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#1E293B] text-white font-medium"
                          : "text-gray-400 hover:bg-[#1E293B] hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="space-y-1">
          {settingsItems.map((section) => (
            <Collapsible
              key={section.key}
              open={open[section.key]}
              onOpenChange={(value) =>
                setOpen((prev) => ({ ...prev, [section.key]: value }))
              }
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-3 hover:bg-[#1E293B] text-gray-200"
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    {section.label}
                  </div>
                  {open[section.key] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-10 mt-1 space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block text-sm px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#1E293B] text-white font-medium"
                          : "text-gray-400 hover:bg-[#1E293B] hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
