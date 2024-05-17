import ConfirmationModal from "@/app/(main)/_components/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Banner {
  documentId: Id<"documents">;
}

export default function Banner({ documentId }: Banner) {
  const router = useRouter();
  const remove = useMutation(api.documents.removeDocument);
  const restore = useMutation(api.documents.restoreDocument);
  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting the page...",
      success: "The page had been deleted.",
      error: "Couldn't delete the page",
    });
    router.push("/documents");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring the page...",
      success: "The page has been restored.",
      error: "Couldn't restore the page",
    });
  };
  return (
    <>
      <div className="w-full bg-[#eb5756] text-center p-2 text-sm text-white flex items-center gap-2 justify-center">
        <span className="">This page is in Trash.</span>
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            onClick={onRestore}
            variant="outline"
            className="text-sm bg-transparent hover:bg-neutral-100/10 hover:text-white text-white font-normal"
          >
            Restore page
          </Button>
          <ConfirmationModal onConfirm={onRemove}>
            <Button
              size="sm"
              variant="outline"
              className="text-sm bg-transparent hover:bg-neutral-100/10 hover:text-white text-white font-normal"
            >
              Delete from Trash
            </Button>
          </ConfirmationModal>
        </div>
      </div>
    </>
  );
}
