"use client";

import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { PlaceholderImage } from "@/components/ui/Media";

/**
 * Poster + gold play button that swaps to an embedded YouTube player on click.
 * Uses the privacy-friendly youtube-nocookie domain (iframe only, no scripts).
 */
export default function WalkthroughVideo({
  youtubeId,
  poster,
  title,
}: {
  youtubeId: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-rotation; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title} walkthrough`}
        >
          <PlaceholderImage
            src={poster}
            alt={title}
            sizes="100vw"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 transition-colors duration-500 group-hover:from-black/60" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-black/40 text-2xl text-gold backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 md:h-24 md:w-24">
            <FiPlay className="ml-1" />
            <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
          </span>
          <span className="absolute bottom-6 left-6 font-ui text-xs uppercase tracking-[0.3em] text-text/80">
            Watch the walkthrough
          </span>
        </button>
      )}
    </div>
  );
}
