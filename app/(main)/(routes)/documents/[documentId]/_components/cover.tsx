"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCover } from "@/hooks/use-cover";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";
interface Cover {
  url?: string;
  preview?: boolean;
}
export default function Cover({ url, preview }: Cover) {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const cover = useCover();
  const removeCover = useMutation(api.documents.removeCover);
  const onRemoveCover = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCover({
      id: params.documentId as Id<"documents">,
    });
  };
  return (
    <>
      <div
        className={`${!url ? "h-[124px]" : "h-[264px]"} ${url && "bg-muted"}  w-full group relative`}
      >
        {!!url && (
          <Image
            className="w-full h-[264px] object-cover"
            alt="cover"
            src={url}
            height={224}
            width={1000}
          />
        )}
        {url && !preview && (
          <div className=" group-hover:opacity-100 opacity-0 transition-all absolute right-4 flex items-center gap-2 bottom-4">
            <Button
              onClick={() => cover.onReplace(url)}
              variant="outline"
              size="sm"
              className="text-muted-foreground text-sm"
            >
              <ImageIcon size={18} className="mr-2" />
              Change cover
            </Button>
            <Button
              onClick={onRemoveCover}
              variant="outline"
              size="sm"
              className="text-muted-foreground text-sm"
            >
              <X size={18} className="mr-2" />
              Remove
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[224px]" />;
};
