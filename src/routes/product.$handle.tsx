import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/shop/PageShell";
import { PurchasePresentation } from "@/components/shop/PurchasePresentation";
import { HowItWorks } from "@/components/shop/HowItWorks";
import { fetchProductByHandle } from "@/lib/shopify";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Foldit 3-i-1 måttsats – köp & produktinformation" },
      { name: "description", content: "Mått och slickepott i ett. Upptäck Foldit med tre mått: ½ dl, 1 msk och 1 tsk, platt förvaring och enkel rengöring." },
      { property: "og:title", content: "Foldit 3-i-1 måttsats – köp & produktinformation" },
      { property: "og:description", content: "Mät, vik och skrapa med Foldit. Tre mått i ett platsbesparande köksredskap." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Tillbaka</Link>
      </div>
      {!isLoading && !product ? <p className="mx-auto max-w-6xl px-5 py-10">Produkten hittades inte.</p> : (
        <>
          <PurchasePresentation product={product} isLoading={isLoading} heading="h1" />
          <HowItWorks />
        </>
      )}
    </PageShell>
  );
}
