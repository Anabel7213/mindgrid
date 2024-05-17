import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Loader, Minus } from "lucide-react";
import Menu from "./menu";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from "next/navigation";

export default function Header() {
  const scrolled = useScroll();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <>
      <div
        className={`p-4 flex justify-between gap-4 items-center ${
          scrolled &&
          "border-b fixed shadow-sm top-0 w-full dark:bg-black bg-white z-10"
        }`}
      >
        <div className="flex items-center gap-2">
          <Logo />
          <div className="md:block hidden">
          <Menu />
          </div>
        </div>
        <div className="flex gap-2 items-center">
        <div className="hidden md:flex gap-2 items-center">
          {isLoading && <Loader className="animate-spin" />}
          {isAuthenticated && !isLoading && (
            <div className="flex gap-2 items-center">
              <Button onClick={() => router.push("/documents")} variant={"ghost"}>
                Open Mindgrid
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
          {!isAuthenticated && !isLoading && (
            <div className="flex gap-2 items-center">
              <Button onClick={() => {}} variant={"ghost"}>
                Request a demo
              </Button>
              <Minus className="rotate-[90deg]" />
              <SignInButton mode="modal">
                <Button variant={"ghost"}>Log in</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button>Get Mindgrid free</Button>
              </SignInButton>
            </div>
          )}
        </div>
        <ModeToggle />
        </div>
      </div>
    </>
  );
}
