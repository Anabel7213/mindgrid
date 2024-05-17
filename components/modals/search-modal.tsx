"use client";

import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
} from "../ui/command";
import { File } from "lucide-react";

export default function SearchModal() {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const onToggle = useSearch((store) => store.onToggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onToggle();
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [onToggle]);

  if (!isMounted) {
    return null;
  }
  const onSelect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
    onClose();
  };
  return (
    <>
      <div className="absolute">
        <Command>
          <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
              placeholder={`Search ${user?.firstName}'s Mindgrid...`}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                {documents?.map((document) => (
                  <CommandItem
                    className="hover:bg-neutral-300"
                    key={document._id}
                    value={`${document._id}`}
                    title={document.title}
                    onSelect={onSelect}
                  >
                    {document.icon ? (
                      <p className="mr-2 text-[18px]">{document.icon}</p>
                    ) : (
                      <File size={18} className="mr-2" />
                    )}
                    <span>{document.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </Command>
      </div>
    </>
  );
}
