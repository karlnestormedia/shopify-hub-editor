import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/shop/PageShell";
import { fetchPolicy, POLICY_KEYS, type PolicySlug } from "@/lib/shopify";

export const Route = createFileRoute("/policy/$slug")({
  head: ({ params }) => {
    const label = POLICY_KEYS[params.slug as PolicySlug]?.label ?? "Policy";
    const title = `${label} – Foldit UF`;
    const description = `${label} för Foldit UF och köp på foldit.se.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: PolicyPage,
});

function PolicyPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["policy", slug],
    queryFn: () => fetchPolicy(slug),
    staleTime: 60_000,
  });
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Tillbaka</Link>
        {isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Laddar…</p>
        ) : !data ? (
          <p className="mt-10">Sidan hittades inte.</p>
        ) : (
          <>
            <h1 className="mt-6 font-display text-4xl">{data.label}</h1>
            <div className="policy-body mt-8 border-t border-border pt-8" dangerouslySetInnerHTML={{ __html: data.body }} />
          </>
        )}
      </article>
    </PageShell>
  );
}
