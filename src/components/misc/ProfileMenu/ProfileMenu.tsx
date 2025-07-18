import { LogOut, Monitor, Moon, Sun, UserCog } from "lucide-react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import React from "react";
import { useProfileContext } from "../../../provider/ProfileProvider";

interface Props {
  selectedTheme: string;
  onSetTheme: (theme: string) => void;
  actionLogout: () => void;
  actionProfile: () => void;
}

export function ProfileMenu({
  selectedTheme,
  onSetTheme,
  actionLogout,
  actionProfile,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { user } = useProfileContext();

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.avatar_url || "/images/default-avatar.jpg"} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex w-[16rem] flex-col px-5 py-5"
        side="bottom"
        align="end"
      >
        <div className="mb-3 flex flex-row justify-center gap-x-3">
          <Avatar>
            <AvatarImage
              src={user?.avatar_url || "/images/default-avatar.jpg"}
            />
          </Avatar>
          <div className="flex flex-col justify-center">
            {user && (
              <h1 className="font-semibold max-w-40 truncate">{`${user?.first_name} ${user?.last_name}`}</h1>
            )}
            <p className="text-sm text-accent-foreground max-w-40 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="mb-3 flex flex-row items-center gap-4">
          <span>Theme</span>
          <Select value={selectedTheme} onValueChange={onSetTheme}>
            <SelectTrigger className="h-9 w-full items-center justify-between rounded border text-sm">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto rounded-md border shadow-md">
              <div className="p-2">
                <SelectItem
                  value={"dark"}
                  className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
                >
                  <div className="flex flex-row items-center gap-2">
                    <Moon size={15} />
                    <span>Dark</span>
                  </div>
                </SelectItem>
                <SelectItem
                  value={"light"}
                  className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
                >
                  <div className="flex flex-row items-center gap-2">
                    <Sun size={15} />
                    <span>Light</span>
                  </div>
                </SelectItem>
                <SelectItem
                  value={"system"}
                  className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
                >
                  <div className="flex flex-row items-center gap-2">
                    <Monitor size={15} />
                    <span>System</span>
                  </div>
                </SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border-y py-2">
            <button
              className="flex w-full flex-row items-center gap-2 rounded-sm px-3 py-2 hover:bg-muted"
              onClick={actionProfile}
            >
              <UserCog size={16} />
              <span>Your Profile</span>
            </button>
          </div>
          <button
            className="flex w-full flex-row items-center gap-2 rounded-sm px-3 py-2 hover:bg-muted"
            onClick={actionLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
