"use client";

import Cover from "@/app/(main)/(routes)/documents/[documentId]/_components/cover";
import Toolbar from "@/app/(main)/(routes)/documents/[documentId]/_components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
interface Page {
  params: {
    documentId: Id<"documents">;
  };
  width: string;
}
export default function DocumentIdPage({ width, params }: Page) {
  const Editor = useMemo(
    () =>
      dynamic(
        () =>
          import(
            "../../../../(main)/(routes)/documents/[documentId]/_components/editor"
          ),
        { ssr: false }
      ),
    []
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.updateDocument);
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };
  if (document === undefined) {
    return (
      <>
        <div className="p-4">
          <Loader size={18} className="animate-spin text-muted-foreground" />
        </div>
      </>
    );
  }
  if (document === null) {
    return (
      <div className="p-4">
        <Loader size={18} className="animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <>
      <EdgeStoreProvider>
        <div className="flex-grow flex flex-col gap-2">
          <Cover preview url={document.coverImage} />
          <div className="md:mx-16 xl:mx-[300px]">
            <Toolbar preview initialData={document} />
            <Editor
              editable={false}
              onChange={onChange}
              initialContent={document.content}
            />
          </div>
        </div>
      </EdgeStoreProvider>
    </>
  );
}
