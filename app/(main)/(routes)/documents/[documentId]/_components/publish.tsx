"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Publish {
  initialData: Doc<"documents">;
}

export default function Publish({ initialData }: Publish) {
  const origin = useOrigin();
  const update = useMutation(api.documents.updateDocument);

  const [isCopied, setCopied] = useState(false);
  const [isBeingSubmitted, setIsBeingSubmitted] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;
  const onPublish = () => {
    setIsBeingSubmitted(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsBeingSubmitted(false));
    toast.promise(promise, {
      loading: "Publishing to the internet...",
      success: "Share the link to your page, it's live!",
      error: "Failed to publish!",
    });
  };
  const onUnpublish = () => {
    setIsBeingSubmitted(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsBeingSubmitted(false));
    toast.promise(promise, {
      loading: "Setting back to private...",
      success: "The page is no longer publicly visible.",
      error: "Failed to unpublish!",
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="font-normal flex gap-1 items-center"
            size="sm"
            variant={"ghost"}
          >
            {initialData.isPublished && (
              <Globe size={18} strokeWidth={1.5} className="text-[#2d7bbf]" />
            )}
            {initialData.isPublished ? "Published" : "Publish"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[248px] max-w-[324px] p-6" forceMount align="end">
          {initialData.isPublished ? (
            <div className="flex flex-col gap-3">
                <div className="flex text-[#2d7bbf] items-center gap-2">
              <Globe size={18} />
              <h1 className="text-sm font-medium">The page is live.</h1>
              </div>
              <div className="flex items-center dark:border rounded-md">
                <div className="truncate text-sm bg-neutral-100 dark:bg-neutral-900 p-2 rounded-l-md">
                    {url}
                </div>
              <Button
                disabled={isCopied}
                onClick={onCopy}
                size="sm"
              >
                {isCopied ? (
                  <Check size={18} strokeWidth={1.5} />
                ) : (
                  <Copy size={18} strokeWidth={1.5} />
                )}
              </Button>
              </div>
              <Button
                variant={"outline"}
                disabled={isBeingSubmitted}
                onClick={onUnpublish}
                size="sm"
                className="w-full"
              >
                Unpublish
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center">
              <Globe size={20} className="text-muted-foreground" />
              <h1 className="font-medium">Publish page</h1>
              <p className="text-muted-foreground text-center text-sm">
                Make your page public & share the link with friends!
              </p>
              <Button
                disabled={isBeingSubmitted}
                onClick={onPublish}
                size="sm"
                className="w-full"
              >
                Publish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
