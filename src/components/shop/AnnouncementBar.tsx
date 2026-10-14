import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Announcement = {
  text: string;
  href?: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  { text: "Foldit är under produktion - Förbeställning öppnar snart!" },
  { text: "Följ Foldit på Tiktok", href: "https://www.tiktok.com/@foldituf" },
  { text: "Följ Foldit på Instagram", href: "https://www.instagram.com/foldituf/" },
];

const ROTATE_MS = 5000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ANNOUNCEMENTS.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % ANNOUNCEMENTS.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-8 bg-obsidian text-xs tracking-wide text-obsidian-foreground">
      {ANNOUNCEMENTS.map((item, i) => {
        const active = i === index;
        const inner = (
          <span className="inline-flex items-center gap-1.5 px-4">
            {item.text}
            {item.href && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
          </span>
        );

        return (
          <div
            key={item.text}
            aria-hidden={!active}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={active ? 0 : -1}
                className="flex h-full w-full items-center justify-center underline-offset-4 hover:underline"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </div>
        );
      })}
    </div>
  );
}
