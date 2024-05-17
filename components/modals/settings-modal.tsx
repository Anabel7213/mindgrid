"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";

export default function SettingsModal() {
  const settings = useSettings();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if(!isMounted) {
    return null
  }
  return (
    <>
    <div className="absolute">
      <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
        <DialogContent>
          <DialogHeader className="border-b pb-3">
            <h1 className="font-medium">Settings</h1>
          </DialogHeader>
          <div className="flex justify-between gap-4 items-center">
              <div className="flex flex-col text-sm">
                <h2 className="font-medium">Appearance</h2>
                <p className="text-neutral-500">Customize how Mindgrid looks on your device.</p>
              </div>
              <ModeToggle />
            </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}
