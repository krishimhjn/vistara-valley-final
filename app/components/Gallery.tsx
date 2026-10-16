"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import "./Gallery.css";
import {
  BLUR_DATA_URL,
  allItems,
  groups,
  tabs,
  videos,
  type Item,
} from "./gallery-data";

/* =========================================
   ✏️  SETTINGS YOU CAN EDIT
   (photos and captions live in gallery-data.ts)
   ========================================= */

const PHONE = "919977048537"; // WhatsApp number (digits only)
const AUTOPLAY_MS = 6000; // time each image stays on the stage
const DARK = false; // true = dark green "cinema" section

const pad = (n: number) => String(n).padStart(2, "0");

const STAGE_SIZES = "(max-width: 760px) 100vw, (max-width: 1000px) 92vw, 1240px";

/* ---------- icons ---------- */

const Icon = ({
  children,
  size = 18,
}: {
  children: React.ReactNode;
  size?: number;
}) => (
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
  <Icon size={17}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Icon>
);
const PlayIcon = () => (
  <Icon size={16}>
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />
  </Icon>
);
const PauseIcon = () => (
  <Icon size={16}>
    <path
      d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"
      fill="currentColor"
      stroke="none"
    />
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
  const [index, setIndex] = useState(0);
  const [prevItem, setPrevItem] = useState<Item | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  const [viewer, setViewer] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [notice, setNotice] = useState("");
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const sectionRef = useRef<HTMLElement | null>(null);
  const pillsRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const stripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const swiped = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const stripDrag = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
    moved: 0,
    lastX: 0,
    lastT: 0,
    v: 0,
  });
  const inertia = useRef(0);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef({ dist: 0, scale: 1 });
  const drag = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const lastTap = useRef(0);

  const list: Item[] = useMemo(
    () =>
      tab === "all"
        ? allItems
        : groups.find((g) => g.id === tab)?.items ?? [],
    [tab]
  );

  const total = list.length;
  const item: Item | undefined = list[index] ?? list[0];

  const running =
    playing &&
    !reduce &&
    inView &&
    tabVisible &&
    !hovering &&
    !dragging &&
    !viewer &&
    total > 1;

  /* ---------- zoom helpers (fullscreen viewer) ---------- */

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

  const select = useCallback(
    (next: number) => {
      if (!total) return;

      const n = (next + total) % total;
      if (n === index) return;

      setPrevItem(item ?? null);
      setIndex(n);
      resetZoom();
    },
    [total, index, item, resetZoom]
  );

  const go = useCallback((d: 1 | -1) => select(index + d), [select, index]);

  const changeTab = (id: string) => {
    if (id === tab) return;

    setPrevItem(item ?? null);
    setTab(id);
    setIndex(0);
    resetZoom();
  };

  const markLoaded = (src: string) =>
    setLoaded((p) => (p[src] ? p : { ...p, [src]: true }));

  /* ---------- open / close the fullscreen viewer ---------- */

  const openViewer = useCallback(() => {
    /* remember what had focus so we can give it back on close */
    lastFocus.current = document.activeElement as HTMLElement | null;
    setViewer(true);
  }, []);

  const closeViewer = useCallback(() => {
    setViewer(false);
    resetZoom();

    /* remove the photo link from the address bar */
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    window.setTimeout(() => lastFocus.current?.focus(), 0);
  }, [resetZoom]);

  /* ---------- environment: reduced motion, visibility ---------- */

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(query.matches);

    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* pause the slideshow while the browser tab is in the background */
  useEffect(() => {
    const onVisibility = () =>
      setTabVisible(document.visibilityState === "visible");

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ---------- deep links: /#gallery-garden-3 ---------- */

  useEffect(() => {
    const match = window.location.hash.match(/^#gallery-([a-z]+)-(\d+)$/);
    if (!match) return;

    const [, id, num] = match;
    const source =
      id === "all" ? allItems : groups.find((g) => g.id === id)?.items;
    if (!source || !source.length) return;

    setTab(id);
    setIndex(Math.min(Math.max(Number(num) - 1, 0), source.length - 1));
    sectionRef.current?.scrollIntoView({ block: "start" });
  }, []);

  /* while the viewer is open, the address bar points at the current photo */
  useEffect(() => {
    if (!viewer) return;

    window.history.replaceState(null, "", `#gallery-${tab}-${index + 1}`);
  }, [viewer, tab, index]);

  /* ---------- sliding category highlight ---------- */

  const measure = useCallback(() => {
    const el = pillRefs.current[tab];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [tab]);

  useEffect(() => {
    measure();

    const el = pillRefs.current[tab];
    const wrap = pillsRef.current;

    if (el && wrap) {
      wrap.scrollTo({
        left: el.offsetLeft - (wrap.clientWidth - el.offsetWidth) / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [measure, tab, reduce]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* ---------- keep the active thumbnail centred in the strip ---------- */

  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];

    if (!strip || !thumb || stripDrag.current.active) return;

    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [index, tab, reduce]);

  /* ---------- fullscreen: keyboard, focus trap, scroll lock ---------- */

  useEffect(() => {
    if (!viewer) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "+" || event.key === "=") zoomTo(scale + 0.5);
      if (event.key === "-") zoomTo(scale - 0.5);

      /* keep Tab inside the viewer */
      if (event.key === "Tab") {
        const root = viewerRef.current;
        if (!root) return;

        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]")
        ).filter((el) => el.getClientRects().length > 0);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || !root.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !root.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [viewer, go, zoomTo, scale, closeViewer]);

  /* ---------- stage: hover tilt, "View" cursor, swipe ---------- */

  const onStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();

    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.left = `${e.clientX - rect.left}px`;
      cursor.style.top = `${e.clientY - rect.top}px`;
    }

    if (reduce) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const tilt = tiltRef.current;
    if (tilt) {
      tilt.style.setProperty("--tx", `${(-x * 18).toFixed(1)}px`);
      tilt.style.setProperty("--ty", `${(-y * 12).toFixed(1)}px`);
    }
  };

  const onStageEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") setHovering(true);
  };

  const onStageLeave = () => {
    setHovering(false);

    const tilt = tiltRef.current;
    if (tilt) {
      tilt.style.setProperty("--tx", "0px");
      tilt.style.setProperty("--ty", "0px");
    }
  };

  const onStageTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swiped.current = false;
  };

  const onStageTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;

    if (Math.abs(dx) > 50 && Math.abs(dy) < 80) {
      swiped.current = true;
      go(dx > 0 ? -1 : 1);
    }
  };

  const onStageKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  /* a swipe is not a tap, so it must not open the viewer */
  const onStageOpen = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }

    openViewer();
  };

  /* ---------- film strip: mouse drag with momentum ---------- */

  const onStripDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;

    const strip = stripRef.current;
    if (!strip) return;

    cancelAnimationFrame(inertia.current);

    stripDrag.current = {
      active: true,
      startX: e.clientX,
      startLeft: strip.scrollLeft,
      moved: 0,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    };

    setDragging(true);
  };

  const onStripMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = stripDrag.current;
    const strip = stripRef.current;

    if (!d.active || !strip) return;

    const dx = e.clientX - d.startX;

    strip.scrollLeft = d.startLeft - dx;
    d.moved = Math.max(d.moved, Math.abs(dx));

    const now = performance.now();
    const dt = Math.max(now - d.lastT, 1);

    d.v = ((d.lastX - e.clientX) / dt) * 16;
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const endStripDrag = () => {
    const d = stripDrag.current;
    const strip = stripRef.current;

    if (!d.active) return;

    d.active = false;
    setDragging(false);

    if (!strip || Math.abs(d.v) < 0.6) return;

    let v = d.v;

    const step = () => {
      strip.scrollLeft += v;
      v *= 0.94;

      if (Math.abs(v) > 0.3) inertia.current = requestAnimationFrame(step);
    };

    inertia.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(inertia.current), []);

  const onThumbClick = (i: number) => {
    /* a drag is not a click */
    if (stripDrag.current.moved > 6) {
      stripDrag.current.moved = 0;
      return;
    }

    select(i);
  };

  /* ---------- fullscreen gestures ---------- */

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
      if (scale > 1) resetZoom();
      else zoomTo(2.5);
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
      setPos(
        clampPos(
          drag.current.px + (event.clientX - drag.current.x),
          drag.current.py + (event.clientY - drag.current.y),
          scale
        )
      );
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

  /* ---------- share (sends a link straight to this photo) ---------- */

  const share = async () => {
    if (!item) return;

    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#gallery-${tab}-${index + 1}`;

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

  /* next + previous images, de-duplicated so a 2-photo tab
     (where next === previous) never produces the same React key twice */
  const neighbours = Array.from(
    new Set([
      list[(index + 1) % (total || 1)],
      list[(index - 1 + total) % (total || 1)],
    ])
  ).filter((n): n is Item => Boolean(n) && n !== item);

  /* =========================================
     RENDER
     ========================================= */

  return (
    <section
      ref={sectionRef}
      className={`gx ${DARK ? "gx--dark" : ""}`}
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className="gx-container">
        {/* HEADER */}

        <div className="gx-header">
          <div>
            <p className="gx-label">VISTARA VALLEY</p>

            <h2 id="gallery-title">
              A Glimpse Into
              <br />
              Life Here
            </h2>
          </div>

          <p className="gx-intro">
            Explore the gardens, parks, entrance and amenities that make
            Vistara Valley a distinctive destination on Khandwa Road,
            Khargone.
          </p>
        </div>

        {/* CATEGORY PILLS */}

        <div className="gx-pills" ref={pillsRef}>
          <div
            className="gx-pills-track"
            role="tablist"
            aria-label="Gallery categories"
          >
            <span
              className="gx-pill-active"
              aria-hidden="true"
              style={{ left: pill.left, width: pill.width }}
            />

            {tabs.map((t) => (
              <button
                key={t.id}
                ref={(el) => {
                  pillRefs.current[t.id] = el;
                }}
                type="button"
                role="tab"
                id={`gallery-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="gallery-panel"
                className={`gx-pill ${tab === t.id ? "is-active" : ""}`}
                onClick={() => changeTab(t.id)}
              >
                {t.label}
                <sup>{pad(t.count)}</sup>
              </button>
            ))}
          </div>
        </div>

        <div
          id="gallery-panel"
          role="tabpanel"
          aria-labelledby={`gallery-tab-${tab}`}
        >
          {tab === "videos" ? (
            <ul className="gx-videos">
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
            item && (
              <>
                {/* STAGE */}

                <div
                  className="gx-stage"
                  tabIndex={0}
                  aria-roledescription="carousel"
                  aria-label="Featured image"
                  onKeyDown={onStageKey}
                  onPointerEnter={onStageEnter}
                  onPointerMove={onStageMove}
                  onPointerLeave={onStageLeave}
                  onTouchStart={onStageTouchStart}
                  onTouchEnd={onStageTouchEnd}
                >
                  <div className="gx-tilt" ref={tiltRef}>
                    {prevItem && prevItem.src !== item.src && (
                      <div className="gx-layer is-prev" aria-hidden="true">
                        <Image
                          src={prevItem.src}
                          alt=""
                          fill
                          sizes={STAGE_SIZES}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          style={{ objectPosition: prevItem.position }}
                          className="gx-img is-loaded"
                        />
                      </div>
                    )}

                    <div
                      key={item.src}
                      className="gx-layer is-current"
                      onAnimationEnd={(e) => {
                        if (e.target === e.currentTarget) setPrevItem(null);
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes={STAGE_SIZES}
                        priority={tab === "all" && index === 0}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        style={{ objectPosition: item.position }}
                        className={`gx-img ${loaded[item.src] ? "is-loaded" : ""}`}
                        onLoad={() => markLoaded(item.src)}
                        ref={(el) => {
                          if (el && el.complete && el.naturalWidth) {
                            markLoaded(item.src);
                          }
                        }}
                      />
                    </div>

                    {/* load the next and previous image ahead of time */}
                    {neighbours.map((n) => (
                      <Image
                        key={n.src}
                        src={n.src}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes={STAGE_SIZES}
                        className="gx-preload"
                      />
                    ))}
                  </div>

                  <div className="gx-shade" aria-hidden="true" />

                  <button
                    type="button"
                    className="gx-open"
                    onClick={onStageOpen}
                    aria-label={`Open ${item.caption} fullscreen`}
                  />

                  <span className="gx-cursor" ref={cursorRef} aria-hidden="true">
                    View
                  </span>

                  <div className="gx-caption" aria-live="polite">
                    <span className="gx-eyebrow">
                      {item.category} · {pad(index + 1)} / {pad(total)}
                    </span>
                    <strong>{item.caption}</strong>
                  </div>

                  {/* enquiry button: visible to everyone, not only in fullscreen */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gx-enquire gx-enquire--stage"
                  >
                    Enquire
                    <span aria-hidden="true">→</span>
                  </a>

                  <div className="gx-tools">
                    {total > 1 && (
                      <button
                        type="button"
                        className="gx-btn"
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                      >
                        {playing ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}

                    <button
                      type="button"
                      className="gx-btn"
                      onClick={openViewer}
                      aria-label="View fullscreen"
                    >
                      <ExpandIcon />
                    </button>
                  </div>

                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        className="gx-btn gx-nav gx-nav-prev"
                        onClick={() => go(-1)}
                        aria-label="Previous image"
                      >
                        <PrevIcon />
                      </button>

                      <button
                        type="button"
                        className="gx-btn gx-nav gx-nav-next"
                        onClick={() => go(1)}
                        aria-label="Next image"
                      >
                        <NextIcon />
                      </button>
                    </>
                  )}

                  {playing && !reduce && total > 1 && (
                    <span className="gx-progress" aria-hidden="true">
                      <span
                        key={`${tab}-${index}`}
                        className={`gx-bar ${running ? "" : "is-paused"}`}
                        style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                        onAnimationEnd={() => go(1)}
                      />
                    </span>
                  )}
                </div>

                {/* FILM STRIP */}

                <div
                  className="gx-strip"
                  ref={stripRef}
                  onPointerDown={onStripDown}
                  onPointerMove={onStripMove}
                  onPointerUp={endStripDrag}
                  onPointerLeave={endStripDrag}
                  onPointerCancel={endStripDrag}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {list.map((entry, i) => (
                    <button
                      key={entry.src}
                      ref={(el) => {
                        thumbRefs.current[i] = el;
                      }}
                      type="button"
                      className={`gx-thumb ${i === index ? "is-active" : ""}`}
                      onClick={() => onThumbClick(i)}
                      aria-label={`Show ${entry.caption}`}
                      aria-current={i === index}
                    >
                      <Image
                        src={entry.src}
                        alt=""
                        fill
                        sizes="140px"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        style={{ objectPosition: entry.position }}
                        draggable={false}
                        className="gx-thumb-img"
                      />
                    </button>
                  ))}
                </div>

                {total > 3 && (
                  <p className="gx-hint" aria-hidden="true">
                    Swipe the thumbnails for more →
                  </p>
                )}
              </>
            )
          )}

          <p className="gx-note">
            Images are artistic impressions. The actual development may vary.
          </p>
        </div>
      </div>

      {/* FULLSCREEN VIEWER */}

      {viewer && item && (
        <div
          className="gx-viewer"
          ref={viewerRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
        >
          <div className="gx-v-top">
            <div className="gx-v-title">
              <small>
                {item.category} · {pad(index + 1)} / {pad(total)}
              </small>
              <strong>{item.caption}</strong>
            </div>

            <div className="gx-v-tools">
              <button
                type="button"
                className="gx-v-btn gx-v-zoom"
                onClick={() => zoomTo(scale - 0.5)}
                aria-label="Zoom out"
                disabled={scale <= 1}
              >
                <MinusIcon />
              </button>

              <button
                type="button"
                className="gx-v-btn gx-v-zoom"
                onClick={() => zoomTo(scale + 0.5)}
                aria-label="Zoom in"
                disabled={scale >= 4}
              >
                <PlusIcon />
              </button>

              <button
                type="button"
                className="gx-v-btn"
                onClick={share}
                aria-label="Share this image"
              >
                <ShareIcon />
              </button>

              <a
                className="gx-v-btn"
                href={item.src}
                download
                aria-label="Download this image"
              >
                <DownloadIcon />
              </a>

              <button
                ref={closeRef}
                type="button"
                className="gx-v-btn gx-v-close"
                onClick={closeViewer}
                aria-label="Close gallery"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div
            className="gx-v-stage"
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onWheel={onWheel}
          >
            <div
              className="gx-v-image"
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
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                draggable={false}
              />
            </div>
          </div>

          <button
            type="button"
            className="gx-v-btn gx-v-arrow gx-v-prev"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            <PrevIcon />
          </button>

          <button
            type="button"
            className="gx-v-btn gx-v-arrow gx-v-next"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            <NextIcon />
          </button>

          <div className="gx-v-bottom">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gx-enquire"
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
