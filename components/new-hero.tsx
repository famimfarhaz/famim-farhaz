import { Hero } from "@/components/ui/hero-1";

export function NewHero() {
  return (
    <Hero
      title={"You've Outgrown Your Website.\nIt's Time to Prove It."}
      subtitle="Most websites are built from templates. Yours won't be. Every line of code is written for your brand, your goals, your users — nothing borrowed."
      eyebrow="Available"
      ctaLabel="View My Work"
      ctaHref="/projects"
    />
  );
}
