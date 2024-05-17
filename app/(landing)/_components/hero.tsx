import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { MoveRight } from "lucide-react";
import Image from "next/image";

interface Hero {
  title: string;
  accent?: string;
  titleHighlight?: boolean;
  highlight?: string;
  subtitle: string;
  cta1: string;
  onClick1: () => void;
  cta2?: string;
  onClick2?: () => void;
  hasImage: boolean,
  image?: string;
  image2?: string
}

export default function Hero({
  title,
  titleHighlight,
  highlight,
  subtitle,
  cta1,
  onClick1,
  cta2,
  onClick2,
  hasImage,
  image,
}: Hero) {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <>
      <div className="flex w-full md:max-w-[800px] px-4 mx-auto flex-col md:items-center gap-4 md:text-center">
        <h1 className="font-bold text-4xl md:text-5xl capitalize">
          {title} {titleHighlight && <span className="underline">{highlight}</span>}
        </h1>
        <h2 className="text-lg md:text-xl text-neutral-500 max-w-[600px]">{subtitle}</h2>
        <div className="flex gap-2">
          {isAuthenticated && !isLoading ? (
            <Button onClick={onClick1} className="bg-[#4f8cf4] hover:bg-[#3b77de]">Open Mindgrid</Button>
          ) : (
            <SignInButton mode="modal">
            <Button className="bg-[#4f8cf4] hover:bg-[#3b77de]">{cta1}</Button>
            </SignInButton>
          )}
          <Button variant="ghost" onClick={onClick2} className="flex text-[#3b77de] hover:text-[#3b77de] hover:bg-[#3b77de]/10 transition-all items-center gap-1">
            {cta2} <MoveRight strokeWidth={1.2} />
          </Button>
        </div>
        {hasImage && (
        <div className="flex items-center gap-2">
        <Image src={image || ""} width={400} height={400} alt="Hero image" />
        </div>
        )}
      </div>
    </>
  );
}
