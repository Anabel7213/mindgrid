import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  LucideIcon,
  MoreHorizontal,
  Plus,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PageItem {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  isPage?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  textColor?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function PageItem({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  isPage,
  level = 0,
  onExpand,
  label,
  icon: Icon,
  onClick,
  textColor,
}: PageItem) {
  const router = useRouter();
  const create = useMutation(api.documents.createDocument);
  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };
  const archive = useMutation(api.documents.archiveDocument);
  const { user } = useUser();
  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Page moved to trash!",
      error: "Failed to move to trash.",
    });
  };
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const sidemenuItems = [
    // {
    //   name: "Add to Favorites",
    //   icon: <Star size={18} strokeWidth={1.5} className="shrink-0" />,
    //   onClick: () => {},
    // },
    // {
    //   name: "Duplicate",
    //   icon: <Copy size={18} strokeWidth={1.5} className="shrink-0" />,
    //   onClick: () => {},
    // },
    // {
    //   name: "Rename",
    //   icon: <SquarePen size={18} strokeWidth={1.5} className="shrink-0" />,
    //   onClick: () => {},
    // },
    {
      name: "Delete",
      icon: <Trash2 size={18} strokeWidth={1.5} className="shrink-0" />,
      onClick: onArchive,
    },
  ];
  const handleCreateDocument = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new page...",
      success: "New page created!",
      error: "Failed to create a new page.",
    });
  };
  return (
    <>
      <div
        onClick={onClick}
        role="button"
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        className={`${active && "bg-neutral-100 dark:bg-neutral-900"} rounded-md flex group/item text-sm w-full hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2 items-center ${textColor || "text-neutral-500"} font-medium`}
      >
        {!!id && (
          <div
            role="button"
            className={`${isPage && "items-center hover:bg-neutral-200 dark:hover:bg-neutral-950 rounded-sm duration-300 transition-all"}`}
            onClick={handleExpand}
          >
            <ChevronIcon
              className={`${isPage && "hidden group-hover/item:block"} shrink-0 text-muted-foreground/70 w-[18px] h-[18px]`}
            />
          </div>
        )}
        <div
          className={`${isSearch && "w-full"} ${isPage && "w-full"} flex items-center`}
        >
          <>
            {documentIcon ? (
              <div
                className={`${isPage && "group-hover/item:hidden"} shrink-0 h-[18px] w-[18px]`}
              >
                {documentIcon}
              </div>
            ) : (
              <Icon
                className={`${isPage && "group-hover/item:hidden"} shrink-0 w-[18px] h-[18px] ${!isPage && "mr-2"}`}
              />
            )}
            <h1 className={`${isPage && "ml-2"} truncate w-full`}>{label}</h1>
            {isSearch && (
              <kbd className="ml-auto pointer-events-none inline-flex h-[18px] select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-sm">⌘</span>K
              </kbd>
            )}
          </>
          {!!id && (
            <div className="flex gap-2 items-center w-full justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="hidden group-hover/item:block transition-all self-end hover:bg-neutral-200 dark:hover:bg-neutral-950 rounded-sm">
                    <MoreHorizontal
                      size={18}
                      className="shrink-0"
                      strokeWidth={1.5}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="flex flex-col gap-1 p-2 md:w-[300px]"
                  align="start"
                  forceMount
                >
                  {sidemenuItems.map((item, i) => (
                    <>
                      <DropdownMenuItem
                        onClick={item.onClick}
                        key={i}
                        className="flex gap-2 cursor-pointer items-center text-neural-700"
                      >
                        <div className="">{item.icon}</div>
                        <span className="truncate">{item.name}</span>
                      </DropdownMenuItem>
                      {i === 0 && <DropdownMenuSeparator />}
                      {i === 3 && <DropdownMenuSeparator />}
                    </>
                  ))}
                  <span className="text-[12px] text-muted-foreground">
                    Last edited by: {user?.firstName}
                  </span>
                </DropdownMenuContent>
              </DropdownMenu>
              <div
                role="button"
                onClick={handleCreateDocument}
                className={`hidden group-hover/item:block transition-all self-end hover:bg-neutral-200 dark:hover:bg-neutral-950 rounded-sm`}
              >
                <Plus className="shrink-0" size={18} strokeWidth={1.5} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

PageItem.Skeleton = function ItemSleteton({ level }: { level?: number }) {
  return (
    <div
      className="flex flex-col gap-2 py-2"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
