"use client";

import { useRouter } from "next/navigation";
import Header from "./(landing)/_components/header";
import Section from "./(landing)/_components/section";
import Footer from "./(landing)/_components/footer";
import Hero from "./(landing)/_components/hero";

export default function LandingPage() {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col gap-16 scroll-smooth">
        <Header />
        <Hero
          title="Capture Your Thoughts & Organize Your Life with"
          titleHighlight
          highlight="Mindgrid"
          subtitle="A place where your thoughts find clarity, ideas stay organized, and plans become actionable."
          cta1="Get Mindgrid free"
          onClick1={() => router.push("/documents")}
          cta2="Request a demo"
          onClick2={() => {}}
          hasImage={false}
        />
        <Section />
        <Footer />
      </div>
    </>
  );
}
