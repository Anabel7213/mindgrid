"use client";

import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCover } from "@/hooks/use-cover";
import CoverModal from "@/components/modals/cover-modal";

interface Toolbar {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export default function Toolbar({ initialData, preview }: Toolbar) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const removeIcon = useMutation(api.documents.removeIcon);

  const update = useMutation(api.documents.updateDocument);
  const enableInput = () => {
    if (preview) return;
    setIsBeingEdited(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };
  const disableInput = () => setIsBeingEdited(false);
  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };
  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };
  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };
  const cover = useCover()
  return (
    <>
      <div className="pl-[54px] mb-2 group/toolbar flex flex-col mx-auto gap-2 w-full justify-center">
        {!!initialData.icon && !preview && (
          <div className="flex items-center gap-2 group/icon">
            <IconPicker onChange={onIconSelect}>
              <p className="text-7xl">{initialData.icon}</p>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              size="sm"
              className="group-hover/icon:opacity-100 text-muted-foreground opacity-0 transition-all rounded-md text-xs"
              variant="ghost"
            >
              <X size={18} />
            </Button>
          </div>
        )}
        {!!initialData.icon && preview && (
          <p className="text-6xl">{initialData.icon}</p>
        )}
        <div className="flex items-center">
          {!initialData.icon && !preview && (
            <IconPicker onChange={onIconSelect}>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover/toolbar:opacity-100 text-muted-foreground flex gap-2"
              >
                <Smile className="" size={18} />
                Add icon
              </Button>
            </IconPicker>
          )}
          {!initialData.coverImage && !preview && (
            <Button
              onClick={cover.onOpen}
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover/toolbar:opacity-100 text-muted-foreground flex gap-2"
            >
              <ImageIcon size={18} />
              Add cover
            </Button>
          )}
        </div>
        {isBeingEdited && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="text-4xl w-full bg-transparent outline-none font-bold text-[#37352f] resize-none dark:text-[#cfcfcf]"
          />
        ) : (
          <div
            onClick={enableInput}
            className="text-4xl w-full bg-transparent outline-none font-bold text-[#37352f] resize-none dark:text-[#cfcfcf]"
          >
            {initialData.title}
          </div>
        )}
      </div>
      <CoverModal />
    </>
  );
}
