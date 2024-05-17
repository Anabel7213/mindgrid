"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { CirclePlus } from "lucide-react";
import Image from "next/image";

interface newUserPlaceholder {
  onClick: () => void;
}

export default function NewUserPlaceholder({ onClick }: newUserPlaceholder) {
  const { user } = useUser();
  return (
    <>
      <div className="mx-auto flex-col gap-4 h-full items-center flex justify-center">
        <Image
          src="/newUserPlaceholder.png"
          alt="Welcome to Mindgrid"
          width={300}
          height={300}
        />
        <h1 className="font-semibold text-xl">
          Hi, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground">Let&#39;s begin by creating a new page.</p>
        <Button onClick={onClick} className="flex items-center gap-2">
          Add a page <CirclePlus strokeWidth={1.5} size={20} />
        </Button>
      </div>
    </>
  );
}
