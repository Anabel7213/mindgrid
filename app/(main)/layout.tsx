"use client";

import SearchModal from "@/components/modals/search-modal";
import SettingsModal from "@/components/modals/settings-modal";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Sidebar from "./_components/sidebar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Navbar from "./(routes)/documents/[documentId]/_components/navbar";
import { WidthProvider } from "@/contexts/WidthContext";

const MainLayoyt = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useConvexAuth();
  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <>
    <WidthProvider>
      <SearchModal />
      <SettingsModal />
      <div className="h-full">
        <main className="flex-1 flex h-full overflow-y-auto">
          <Sidebar />
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
        </main>
      </div>
      </WidthProvider>
    </>
  );
};

export default MainLayoyt;
