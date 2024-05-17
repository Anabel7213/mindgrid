import {
  ChevronsRight,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageItem from "./page-item";
import { toast } from "sonner";
import DocumentList from "./document-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import Navbar from "../(routes)/documents/[documentId]/_components/navbar";
import Cover from "../(routes)/documents/[documentId]/_components/cover";
import Toolbar from "../(routes)/documents/[documentId]/_components/toolbar";

export default function Sidebar() {
  const router = useRouter()
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [isResetting, setIsResseting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    }
  }, [isMobile, pathname]);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240; //lower limit
    if (newWidth > 480) newWidth = 480; //upper limit

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    }
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResseting(true);
      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 240px)";
      navbarRef.current.style.left = isMobile ? "100%" : "240px";
    }
  };
  const handleCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResseting(false);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.width = "100%";
      navbarRef.current.style.left = "0";
    }
  };
  const createDocument = useMutation(api.documents.createDocument);
  const handleCreate = () => {
    const promise = createDocument({
      title: "Untitled",
    }).then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, {
      loading: "Creating a new page...",
      success: "New page created!",
      error: "Erorr creating a new page.",
    });
  };
  const { onToggle } = useSearch();
  const { onOpen } = useSettings();
  return (
    <>
      <aside
        ref={sidebarRef}
        className={`${isResetting && "transition-all ease-in-out duration-300"} ${isCollapsed && "transition-all ease-in-out duration-300"} ${isMobile && "w-0"} group/sidebar h-full bg-neutral-50 dark:bg-neutral-950 border-r z-[10000] overflow-y-auto relative flex flex-col gap-4`}
      >
        <div className="">
          <UserItem isMobile={isMobile} handleCollapse={handleCollapse} />
          <div>
            <PageItem
              label="Search"
              isSearch
              onClick={onToggle}
              icon={Search}
            />
            <PageItem label="Settings" onClick={onOpen} icon={Settings} />
            <PageItem
              label="Add a page"
              onClick={handleCreate}
              icon={PlusCircle}
            />
          </div>
        </div>
        <div>
          <DocumentList />
          <PageItem
            onClick={handleCreate}
            label="Add a page"
            icon={Plus}
            textColor="text-neutral-400"
          />
        </div>
        <Popover>
          <PopoverTrigger>
            <PageItem icon={Trash2} label="Trash" />
          </PopoverTrigger>
          <PopoverContent
            className="w-full md:w-[300px]"
            align="start"
            side={isMobile ? "bottom" : "right"}
          >
            <TrashBox />
          </PopoverContent>
        </Popover>
        <div
          role="button"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition-all cursor-ew-resize absolute h-full w-[1.5px] bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={`absolute top-0 z-[10000] left-60 w-[calc(100%-240px)] ${isResetting && "transition-all ease-in-out duration-300"} ${isMobile && "left-0 w-full"}`}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="">
            {isCollapsed && (
              <div className="group p-4">
                <MenuIcon
                  onClick={resetWidth}
                  role="button"
                  strokeWidth={1.5}
                  className="group-hover:hidden"
                />
                <ChevronsRight
                  onClick={resetWidth}
                  role="button"
                  strokeWidth={1.5}
                  className="hidden group-hover:block"
                />
              </div>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
