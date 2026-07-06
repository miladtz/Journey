import { getFeaturedProducts } from "@/lib/products";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { HowItWorksCondensed } from "@/components/home/HowItWorksCondensed";
import { TrustSection } from "@/components/home/TrustSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const product = featured[0] ?? null;

  return (
    <>
      <Hero product={product} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksCondensed />
      <StatsStrip />
      <TrustSection />
      <FinalCTA productSlug={product?.slug ?? null} />
    </>
  );
}
