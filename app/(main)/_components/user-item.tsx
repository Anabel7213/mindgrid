import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronDown, ChevronsLeft } from "lucide-react";
import Image from "next/image";

export default function UserItem({ handleCollapse, isMobile }: any) {
  const { user } = useUser();
  return (
    <>
      <div className="p-1">
        <DropdownMenu>
          <div className="flex hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg  transition-all items-center p-3 gap-2 justify-between">
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2">
                <Image
                  src={user?.imageUrl || "/"}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="text-start text-sm line-clamp-1">
                  {user?.fullName}&#39;s Mindgrid
                </span>
                <div className="flex gap-2 items-center">
                  <ChevronDown
                    className="text-neutral-400 hover mr-6"
                    strokeWidth={1.5}
                    size={18}
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <div>
              <ChevronsLeft
                role="button"
                onClick={handleCollapse}
                className={`text-neutral-400 ${isMobile ? "opacity-100" : "opacity-0 group-hover/sidebar:opacity-100"} hover:bg-neutral-200 dark:hover:bg-neutral-900 rounded-sm cursor-pointer z-[100002]`}
                strokeWidth={1.5}
              />
            </div>
          </div>
          <DropdownMenuContent className="m-4 flex flex-col min-w-[264px]">
            <span className="text-[12px] p-4 text-neutral-500">
              {user?.emailAddresses[0].emailAddress}
            </span>
            <div className="flex gap-2 items-center px-4 pb-4">
              <Image
                src={user?.imageUrl || "/"}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-sm"
              />
              <div>
                <span className="text-sm text-start line-clamp-1">
                  {user?.firstName}&#39;s Mindgrid
                </span>
                <p className="text-[13px] text-neutral-500">{user?.fullName}</p>
              </div>
            </div>
            <div className="border-b"></div>
            <div className="p-2 bg-neutral-50 dark:bg-neutral-950">
              <SignOutButton>
                <button className="w-full rounded-lg text-start text-[12px] text-neutral-500 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                  Log out
                </button>
              </SignOutButton>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
