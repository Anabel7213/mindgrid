"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ChevronsRight, MenuIcon, Star } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import { Button } from "@/components/ui/button";
import Menu from "./menu";
import Publish from "./publish";

interface Navbar {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
export default function Navbar({ isCollapsed, onResetWidth }: Navbar) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });
  if (document === undefined) {
    return <Title.Skeleton />;
  }
  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className="w-full z-[100000] flex gap-2 p-2 items-center bg-white dark:bg-[#0a0a0a]">
        {isCollapsed && (
          <div className="group dark:bg-[#0a0a0a]">
            <MenuIcon
              onClick={onResetWidth}
              role="button"
              strokeWidth={1.5}
              className="group-hover:hidden"
            />
            <ChevronsRight
              onClick={onResetWidth}
              role="button"
              strokeWidth={1.5}
              className="hidden group-hover:block"
            />
          </div>
        )}
        <div className="flex justify-between w-full items-center dark:bg-[#0a0a0a]">
          <Button size="sm" variant="ghost" onClick={() => {}}>
            <Title initialData={document} />
          </Button>
          <div className="flex items-center">
            <Publish initialData={document} />
            <Button size="sm" variant={"ghost"}>
              <Star strokeWidth={1.5} size={18} />
            </Button>
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
