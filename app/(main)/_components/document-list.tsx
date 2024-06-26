"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import PageItem from "./page-item";
import { FileIcon } from "lucide-react";

interface DocumentList {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

export default function DocumentList({
  parentDocumentId,
  level = 0,
}: DocumentList) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const documents = useQuery(api.documents.getSidebarViewDocuments, {
    parentDocument: parentDocumentId,
  });
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <PageItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <PageItem.Skeleton level={level} />
            <PageItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p
        className={`hidden px-10 text-sm font-medium text-muted-foreground/80 ${expanded && "last:block"} ${level === 0 && "hidden"}`}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <PageItem
            isPage={true}
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
