"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface Title {
  initialData: Doc<"documents">;
}

export default function Title({ initialData }: Title) {
  const update = useMutation(api.documents.updateDocument);
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const enableInput = () => {
    setTitle(initialData.title);
    setIsBeingEdited(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsBeingEdited(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      id: initialData._id,
      title: e.target.value || "Untitled",
    });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };
  return (
    <>
      {!!initialData.icon && <div className="text-[16px] z-[100000]">{initialData.icon}</div>}
      {isBeingEdited ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="outline-none border-0 ring-0 bg-transparent focus-visible:ring-transparent"
        />
      ) : (
        <Button size="sm" variant="ghost" onClick={enableInput} className="ml-[-5px]">
          {initialData?.title}
        </Button>
      )}
    </>
  );
}

Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton />
    )
}