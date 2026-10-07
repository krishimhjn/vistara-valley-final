"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Gallery.css";

/* =========================================
   ✏️  SETTINGS YOU CAN EDIT
   ========================================= */

const IMG = "/images";
const PHONE = "919977048537"; // WhatsApp number (digits only)

type Item = {
  src: string;
  alt: string;
  caption: string;
  category: string;
};

type Group = {
  id: string;
  label: string;
  items: Item[];
};

/*
  Builds items like garden1.jpg ... garden7.jpg.
  Give real captions in the same order as the image numbers, e.g.
  captions: ["Central fountain", "Open-air stage", ...]
  Any caption you leave out becomes "Garden view 3" etc.
*/
function build(
  prefix: string,
  count: number,
  label: string,
  altText: string,
  captions: string[] = []
): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `${IMG}/${prefix}${i + 1}.jpg`,
    alt: `${altText} – ${captions[i] ?? `${label} view ${i + 1}`}`,
    caption: captions[i] ?? `${label} view ${i + 1}`,
    category: label,
  }));
}

const groups: Group[] = [
  {
    id: "garden",
    label: "Garden",
    items: build(
      "garden",
      7,
      "Garden",
      "Landscaped garden at Vistara Valley, Khandwa Road, Khargone",
      [] // ← add captions here
    ),
  },
  {
    id: "park",
    label: "Park",
    items: build(
      "park",
      2,
      "Park",
      "Park and play area at Vistara Valley, Khargone",
      []
    ),
  },
  {
    id: "entrance",
    label: "Entrance",
    items: build(
      "ent",
      2,
      "Entrance",
      "Grand entrance gateway of Vistara Valley, Khargone",
      []
    ),
  },
  {
    id: "amenities",
    label: "Amenities",
    items: build(
      "ami",
      6,
      "Amenities",
      "Amenities at Vistara Valley residential plots, Khargone",
      []
    ),
  },
];

/*
  🎬 Videos (optional). Put the files in /public/videos and /public/images.
  Leave the list empty and the Videos tab stays hidden.

  const videos = [
    { src: "/videos/walkthrough.mp4", poster: "/images/video-poster.jpg", caption: "Drone view of Vistara Valley" },
  ];
*/
type VideoItem = { src: string; poster?: string; caption: string };
const videos: VideoItem[] = [];

/* used only until an image finishes loading and we know its real shape */
const FALLBACK_SHAPE = "4 / 3";

const pad = (n: number) => String(n).padStart(2, "0");

/* mixes the categories so the "All" tab starts with variety */
function interleave(lists: Item[][]): Item[] {
  const result: Item[] = [];
  const longest = Math.max(...lists.map((l) => l.length));

  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      if (list[i]) result.push(list[i]);
    }
  }

  return result;
}

const allItems = interleave(groups.map((g) => g.items));

const tabs: { id: string; label: string; count: number }[] = [
  { id: "all", label: "All", count: allItems.length },
  ...groups.map((g) => ({ id: g.id, label: g.label, count: g.items.length })),
  ...(videos.length
    ? [{ id: "videos", label: "Videos", count: videos.length }]
    : []),
];

/* ---------- icons ---------- */

type IconProps = { children: React.ReactNode; size?: number };

const Icon = ({ children, size = 18 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const CloseIcon = () => (
  <Icon size={20}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Icon>
);
const PrevIcon = () => (
  <Icon>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
);
const NextIcon = () => (
  <Icon>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
const ExpandIcon = () => (
  <Icon size={16}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Icon>
);
const PlusIcon = () => (
  <Icon>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const MinusIcon = () => (
  <Icon>
    <path d="M5 12h14" />
  </Icon>
);
const DownloadIcon = () => (
  <Icon>
    <path d="M12 4v11" />
    <path d="M7.5 11l4.5 4.5 4.5-4.5" />
    <path d="M4 20h16" />
  </Icon>
);
const ShareIcon = () => (
  <Icon>
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="17" cy="6" r="2.4" />
    <circle cx="17" cy="18" r="2.4" />
    <path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" />
  </Icon>
);

/* =========================================
   COMPONENT
   ========================================= */

export default function Gallery() {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [notice, setNotice] = useState("");

  /* NEW: real width / height of each image, filled in as images load */
  const [shapes, setShapes] = useState<Record<string, string>>({});

  const frameRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef({ dist: 0, scale: 1 });
  const drag = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const lastTap = useRef(0);

  const list: Item[] =
    tab === "all"
      ? allItems
      : groups.find((g) => g.id === tab)?.items ?? [];

  const item = open !== null ? list[open] : null;
  const total = list.length;

  /* ---------- zoom helpers ---------- */

  const clampPos = useCallback((x: number, y: number, s: number) => {
    const el = frameRef.current;
    if (!el) return { x, y };

    const maxX = ((s - 1) * el.clientWidth) / 2;
    const maxY = ((s - 1) * el.clientHeight) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const zoomTo = useCallback(
    (next: number) => {
      const s = Math.max(1, Math.min(4, next));
      setScale(s);
      setPos((p) => (s === 1 ? { x: 0, y: 0 } : clampPos(p.x, p.y, s)));
    },
    [clampPos]
  );

  /* ---------- navigation ---------- */

  const go = useCallback(
    (direction: 1 | -1) => {
      if (open === null || total === 0) return;
      resetZoom();
      setOpen((open + direction + total) % total);
    },
    [open, total, resetZoom]
  );

  const openAt = (index: number) => {
    resetZoom();
    setOpen(index);
  };

  const close = useCallback(() => {
    setOpen(null);
    resetZoom();
  }, [resetZoom]);

  const changeTab = (id: string) => {
    setTab(id);
    close();
    scrollRef.current?.scrollTo({ top: 0 }); // start at the top on every tab
  };

  /* ---------- fullscreen: keyboard, scroll lock, focus ---------- */

  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "+" || event.key === "=") zoomTo(scale + 0.5);
      if (event.key === "-") zoomTo(scale - 0.5);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go, zoomTo, scale]);

  /* ---------- touch + mouse gestures ---------- */

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        scale,
      };
      swipe.current = null;
      return;
    }

    drag.current = {
      x: event.clientX,
      y: event.clientY,
      px: pos.x,
      py: pos.y,
    };
    swipe.current = { x: event.clientX, y: event.clientY };

    /* double tap / double click toggles zoom */
    const now = Date.now();
    if (now - lastTap.current < 300) {
      scale > 1 ? resetZoom() : zoomTo(2.5);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;

    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      zoomTo(pinch.current.scale * (dist / pinch.current.dist));
      return;
    }

    if (scale > 1) {
      const next = clampPos(
        drag.current.px + (event.clientX - drag.current.x),
        drag.current.py + (event.clientY - drag.current.y),
        scale
      );
      setPos(next);
    }
  };

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);

    if (pointers.current.size === 0 && swipe.current && scale === 1) {
      const dx = event.clientX - swipe.current.x;
      const dy = event.clientY - swipe.current.y;

      if (Math.abs(dx) > 60 && Math.abs(dy) < 80) go(dx > 0 ? -1 : 1);
    }

    if (pointers.current.size === 1) {
      const [rest] = Array.from(pointers.current.values());
      drag.current = { x: rest.x, y: rest.y, px: pos.x, py: pos.y };
    }

    if (pointers.current.size === 0) swipe.current = null;
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    zoomTo(scale - event.deltaY * 0.002);
  };

  /* ---------- share ---------- */

  const share = async () => {
    if (!item) return;

    const url = `${window.location.origin}${item.src}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Vistara Valley",
          text: item.caption,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setNotice("Link copied");
        window.setTimeout(() => setNotice(""), 2000);
      }
    } catch {
      /* user cancelled sharing */
    }
  };

  const whatsappUrl = item
    ? `https://wa.me/${PHONE}?text=${encodeURIComponent(
        `Hello Vistara Valley team, I saw "${item.caption}" on your website and I'm interested in the plots. Please share the details and help me book a site visit.`
      )}`
    : "#";

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-container">
        {/* HEADER */}

        <div className="gallery-header">
          <div className="gallery-heading">
            <p className="gallery-label">VISTARA VALLEY</p>

            <h2 id="gallery-title">
              A Glimpse Into
              <br />
              Life Here
            </h2>
          </div>

          <div className="gallery-intro">
            <p>
              Explore the gardens, parks, entrance and amenities that make
              Vistara Valley a distinctive destination on Khandwa Road,
              Khargone.
            </p>
          </div>
        </div>

        {/* TABS */}

        <div
          className="gallery-tabs"
          role="tablist"
          aria-label="Gallery categories"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`gallery-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="gallery-panel"
              className={`gallery-tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => changeTab(t.id)}
            >
              {t.label}
              <sup>{pad(t.count)}</sup>
            </button>
          ))}
        </div>

        {/* GRID */}

        <div
          id="gallery-panel"
          role="tabpanel"
          aria-labelledby={`gallery-tab-${tab}`}
        >
          {/* fixed-height scroll window around the grid / videos */}
          <div className="gallery-scroll" ref={scrollRef}>
            {tab === "videos" ? (
              <ul className="gallery-videos" key="videos">
                {videos.map((video) => (
                  <li key={video.src}>
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={video.poster}
                      src={video.src}
                    />
                    <p>{video.caption}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul
                className="gallery-grid"
                key={tab}
                data-count={list.length <= 2 ? "few" : "many"}
              >
                {list.map((entry, index) => (
                  <li
                    key={entry.src}
                    style={
                      {
                        /* NEW: card shape follows the real image shape */
                        "--shape": shapes[entry.src] ?? FALLBACK_SHAPE,
                        "--d": `${Math.min(index, 8) * 0.05}s`,
                      } as React.CSSProperties
                    }
                  >
                    <button
                      type="button"
                      className="gallery-tile"
                      onClick={() => openAt(index)}
                      aria-label={`Open ${entry.caption}`}
                    >
                      <Image
                        src={entry.src}
                        alt={entry.alt}
                        fill
                        sizes="(max-width: 760px) 50vw, (max-width: 1000px) 46vw, 410px"
                        priority={index < 3}
                        className="gallery-tile-image"
                        /* NEW: read the real size once the image loads */
                        onLoad={(e) => {
                          const { naturalWidth: w, naturalHeight: h } =
                            e.currentTarget;
                          if (!w || !h) return;
                          setShapes((prev) =>
                            prev[entry.src]
                              ? prev
                              : { ...prev, [entry.src]: `${w} / ${h}` }
                          );
                        }}
                      />

                      <span className="gallery-tile-overlay">
                        <span className="gallery-tile-caption">
                          <small>{entry.category}</small>
                          {entry.caption}
                        </span>

                        <span className="gallery-tile-expand">
                          <ExpandIcon />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* stays outside the scroll window, always visible */}
          <p className="gallery-note">
            Images are artistic impressions. The actual development may vary.
          </p>
        </div>
      </div>

      {/* FULLSCREEN VIEWER */}

      {item && (
        <div
          className="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
        >
          <div className="gallery-viewer-top">
            <div className="gallery-viewer-title">
              <small>
                {item.category} · {pad((open ?? 0) + 1)} / {pad(total)}
              </small>
              <strong>{item.caption}</strong>
            </div>

            <div className="gallery-viewer-tools">
              <button
                type="button"
                className="gallery-tool"
                onClick={() => zoomTo(scale - 0.5)}
                aria-label="Zoom out"
                disabled={scale <= 1}
              >
                <MinusIcon />
              </button>

              <button
                type="button"
                className="gallery-tool"
                onClick={() => zoomTo(scale + 0.5)}
                aria-label="Zoom in"
                disabled={scale >= 4}
              >
                <PlusIcon />
              </button>

              <button
                type="button"
                className="gallery-tool"
                onClick={share}
                aria-label="Share this image"
              >
                <ShareIcon />
              </button>

              <a
                className="gallery-tool"
                href={item.src}
                download
                aria-label="Download this image"
              >
                <DownloadIcon />
              </a>

              <button
                ref={closeRef}
                type="button"
                className="gallery-tool gallery-tool-close"
                onClick={close}
                aria-label="Close gallery"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div
            className="gallery-viewer-stage"
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onWheel={onWheel}
          >
            <div
              className="gallery-viewer-image"
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`,
                cursor: scale > 1 ? "grab" : "zoom-in",
              }}
            >
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                quality={90}
                draggable={false}
              />
            </div>
          </div>

          <button
            type="button"
            className="gallery-arrow gallery-arrow-prev"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            <PrevIcon />
          </button>

          <button
            type="button"
            className="gallery-arrow gallery-arrow-next"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            <NextIcon />
          </button>

          <div className="gallery-viewer-bottom">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-enquire"
            >
              Enquire on WhatsApp
              <span aria-hidden="true">→</span>
            </a>

            <p>
              Artistic impression · double-tap or pinch to zoom
              {notice && <em> · {notice}</em>}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}