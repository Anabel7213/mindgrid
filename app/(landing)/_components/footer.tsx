import { Button } from "@/components/ui/button";
import Hero from "./hero";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <>
      <Hero
        title="Get started for free"
        subtitle="It doens't cost a dime to try."
        cta1="Get Mindgrid free"
        onClick1={() => {}}
        cta2="Request a demo"
        onClick2={() => {}}
        hasImage={true}
        image="/landing/footer.png"
      />
      <div className="flex p-4 border-t items-center justify-between gap-2">
        <div className="flex items-center gap-2 w-full justify-between md:w-fit md:justify-start">
          <Logo />
          <h2 className="text-neutral-500 text-sm">
            Made by Anabel with{" "}
            <Link
              target="blank"
              href="https://www.davinci.llc/"
              className="underline"
            >
              Davinci
            </Link>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost">Privacy policy</Button>
          <Button variant="ghost">Terms of use</Button>
        </div>
      </div>
    </>
  );
}
