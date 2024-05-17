"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCover } from "@/hooks/use-cover";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { SingleImageDropzone } from "../ui/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default function CoverModal() {
  const update = useMutation(api.documents.updateDocument);
  const [file, setFile] = useState<File>();
  const [isBeingUploaded, setIsBeingUploaded] = useState(false);
  const { edgestore } = useEdgeStore();
  const cover = useCover();
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  const onClose = () => {
    setFile(undefined);
    setIsBeingUploaded(false);
    cover.onClose();
  };
  const onChange = async (file?: File) => {
    if (file) {
      setIsBeingUploaded(true);
      setFile(file);
      const response = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: cover.url,
        },
      });
      await update({
        id: params.documentId as Id<"documents">,
        coverImage: response.url,
      });

      onClose();
    }
  };
  return (
    <>
      <Dialog open={cover.isOpen} onOpenChange={cover.onClose}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-sm font-medium">Cover image</h2>
          </DialogHeader>
          <div className="text-sm w-full">
            <SingleImageDropzone
              disabled={isBeingUploaded}
              value={file}
              onChange={onChange}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
