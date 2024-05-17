"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import NewUserPlaceholder from "../../_components/new-user-placeholder";

export default function DocumentPage(): JSX.Element {
  const router = useRouter();
  const createDocument = useMutation(api.documents.createDocument);
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (!isAuthenticated && isLoading) {
    return redirect("/");
  }
  const onCreateDocument = () => {
    const promise = createDocument({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new page...",
      success: "New page created!",
      error: "Failed to create a new page.",
    });
  };
  return (
    <>
      <NewUserPlaceholder onClick={onCreateDocument} />
    </>
  );
}
