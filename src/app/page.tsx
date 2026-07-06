import { getAllProducts } from "@/lib/products";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { HowItWorksCondensed } from "@/components/home/HowItWorksCondensed";
import { TrustSection } from "@/components/home/TrustSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

export default async function HomePage() {
  const products = await getAllProducts();
  const product = products.find((item) => item.featured) ?? products[0] ?? null;

  return (
    <>
      <Hero product={product} />
      <ProductGrid products={products} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksCondensed />
      <StatsStrip />
      <TrustSection />
      <FinalCTA productSlug={product?.slug ?? null} />
    </>
  );
}
