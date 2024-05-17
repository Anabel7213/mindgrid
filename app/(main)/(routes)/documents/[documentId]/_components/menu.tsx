import ConfirmationModal from "@/app/(main)/_components/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { WidthContext } from "@/contexts/WidthContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
interface Menu {
  documentId: Id<"documents">;
}
export default function Menu({ documentId }: Menu) {
  const { width, setWidth } = useContext(WidthContext)
  const router = useRouter();
  const archiveDocument = useMutation(api.documents.archiveDocument);
  const onArchive = () => {
    const promise = archiveDocument({ id: documentId });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Paga moved to trash.",
      error: "Failed to archive the page!",
    });
    router.push("/documents");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 flex flex-col gap-1" forceMount align="end">
          {/* <div className="flex">
            {fontTypes.map((font, i) => (
              <DropdownMenuItem key={i} className="p-4">
                <span>{font.icon}</span>
                <h1>{font.name}</h1>
              </DropdownMenuItem>
            ))}
          </div> */}
          {/* <DropdownMenuItem className="flex justify-between gap-4 items-center">
            <h1>Small text</h1>
            <Switch />
          </DropdownMenuItem> */}
          <DropdownMenuItem className="flex justify-between gap-4 items-center">
            <h1>Full width</h1>
            <Switch checked={width} onClick={() => setWidth(prev => !prev)}/>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem className="flex items-center gap-2">
            <Copy size={18} strokeWidth={1.5} />
            <h1>Duplicate</h1>
          </DropdownMenuItem> */}
          <ConfirmationModal onConfirm={onArchive}>
            <div className="flex text-sm px-2 py-1.5 gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-sm">
              <Trash2 size={18} strokeWidth={1.5} />
              <h1>Delete</h1>
            </div>
          </ConfirmationModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
