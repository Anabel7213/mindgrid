import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PageItem from "./page-item";
import { CircleX, LucideFile, Trash2, Undo2 } from "lucide-react";
import ConfirmationModal from "./confirm-modal";

export default function TrashBox() {
  const params = useParams();
  const router = useRouter();
  const getArchivedDocuments = useQuery(api.documents.getArhivedDocuments);
  const restoreDocument = useMutation(api.documents.restoreDocument);
  const removeDocument = useMutation(api.documents.removeDocument);

  const [search, setSearch] = useState("");
  const filteredDocuments = getArchivedDocuments?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restoreDocument({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring the page",
      success: "Page restored!",
      error: "Failed to restore the page.",
    });
  };
  const onRemove = (documentId: Id<"documents">) => {
    const promise = removeDocument({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting the page",
      success: "Page deleted!",
      error: "Failed to delete the page.",
    });
    if (params.documentId === documentId) {
      router.push("/");
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
          <div className="border text-sm w-full rounded-sm py-1 px-2 mb-2 flex justify-between">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search"
              placeholder="Search pages in Trash"
              className="w-full truncate outline-none"
            />
            <CircleX
              onClick={() => setSearch("")}
              size={18}
              className={`shrink-0 text-neutral-500 ${search.length > 0 ? "block" : "hidden"}`}
            />
          </div>
        <div className="flex flex-col">
          <p className="hidden last:block text-xs text-neutral-500/50 mb-2">
            No pages found.
          </p>
          {filteredDocuments?.map((document) => (
            <div
              onClick={() => onClick(document._id)}
              role="button"
              key={document._id}
              className="flex justify-between pr-2 rounded-md gap-4 hover:bg-neutral-100 dark:hover:bg-neutral-900 items-center"
            >
              <PageItem icon={LucideFile} label={document.title} />
              <div className="flex gap-2 items-center">
                <div
                  role="button"
                  onClick={(e) => onRestore(e, document._id)}
                  className="p-[2px] cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-950 transition-all rounded-sm"
                >
                  <Undo2 size={18} className="shrink-0 text-neutral-500" />
                </div>
                <div
                  role="button"
                  onClick={() => setOpen(true)}
                  className="p-[2px] cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-950 transition-all rounded-sm"
                >
                  <ConfirmationModal onConfirm={() => onRemove(document._id)}>
                    <Trash2 size={18} className="shrink-0 text-neutral-500" />
                  </ConfirmationModal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
