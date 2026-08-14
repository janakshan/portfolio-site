import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CtaBanner />
      <Projects />
      <CtaBanner />
      <About />
      <CtaBanner />
      <TechStack />
      {/* No banner between these two — Contact is itself the call to action. */}
      <Contact />
    </>
  );
}
