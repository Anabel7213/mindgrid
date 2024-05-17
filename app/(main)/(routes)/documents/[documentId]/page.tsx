"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import Toolbar from "./_components/toolbar";
import Cover from "./_components/cover";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";
import { WidthContext } from "@/contexts/WidthContext";
interface Page {
  params: {
    documentId: Id<"documents">;
  }
}
export default function DocumentIdPage({ params }: Page) {
  const { width } = useContext(WidthContext)
  const Editor = useMemo(
    () => dynamic(() => import("./_components/editor"), { ssr: false }),
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
      <div className="flex-grow flex flex-col gap-2">
        <Cover url={document.coverImage} />
        <div className={`${width ? "w-full" : "w-[800px] mx-auto"} transition-all duration-500 ease-in-out pb-16`}>
          <Toolbar initialData={document} />
          <Editor onChange={onChange} initialContent={document.content} />
        </div>
      </div>
    </>
  );
}