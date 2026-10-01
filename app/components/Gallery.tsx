"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Gallery.css";

type Slide = {
  src: string;
  alt: string;
  caption: string;
};

type Category = {
  id: string;
  label: string;
  tagline: string;
  slides: Slide[];
};

const IMG = "/images";
const AUTOPLAY_MS = 5500;

const pad = (value: number) => String(value).padStart(2, "0");

/*
  Builds slides like garden1.jpg ... garden7.jpg
  Optional: pass your own captions in order, e.g. ["Open-air stage", "Fountain court"]
*/
const buildSlides = (
  prefix: string,
  count: number,
  title: string,
  altText: string,
  captions: string[] = []
): Slide[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `${IMG}/${prefix}${i + 1}.jpg`,
    alt: `${altText} – view ${i + 1}`,
    caption: captions[i] ?? `${title} ${pad(i + 1)}`,
  }));

const categories: Category[] = [
  {
    id: "garden",
    label: "Garden",
    tagline: "Landscaped lawns, pathways and flowering borders.",
    slides: buildSlides(
      "garden",
      7,
      "Garden",
      "Landscaped garden at Vistara Valley, Khandwa Road, Khargone"
    ),
  },
  {
    id: "park",
    label: "Park",
    tagline: "Open green space and play areas for every age.",
    slides: buildSlides(
      "park",
      2,
      "Park",
      "Park and play area at Vistara Valley, Khargone"
    ),
  },
  {
    id: "entrance",
    label: "Entrance",
    tagline: "A gateway that sets the tone for the community.",
    slides: buildSlides(
      "ent",
      2,
      "Entrance",
      "Grand entrance gateway of Vistara Valley, Khargone"
    ),
  },
  {
    id: "amenities",
    label: "Amenities",
    tagline: "Spaces designed for gathering, celebration and calm.",
    slides: buildSlides(
      "ami",
      6,
      "Amenities",
      "Amenities at Vistara Valley residential plots, Khargone"
    ),
  },
];

/* ---------- small inline icons ---------- */

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Expand = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

const Play = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

const Pause = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
  </svg>
);

const Close = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export default function Gallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const category = categories[activeTab];
  const slides = category.slides;
  const slide = slides[index];
  const total = slides.length;

  const running = autoplay && !hovered && !lightbox && !reduceMotion && total > 1;

  const goTo = useCallback(
    (next: number) => {
      const count = categories[activeTab].slides.length;
      setIndex((next + count) % count);
    },
    [activeTab]
  );

  const showPrevious = useCallback(() => goTo(index - 1), [goTo, index]);
  const showNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setIndex(0);
  };

  /* respect the visitor's reduced-motion setting */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  /* gentle auto-play */
  useEffect(() => {
    if (!running) return;

    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % categories[activeTab].slides.length);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timer);
  }, [running, index, activeTab]);

  /* keep the active thumbnail centred without scrolling the page */
  useEffect(() => {
    const container = thumbsRef.current;
    const thumb = thumbRefs.current[index];
    if (!container || !thumb) return;

    container.scrollTo({
      left: thumb.offsetLeft - (container.clientWidth - thumb.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [index, activeTab]);

  /* keyboard controls for the lightbox */
  useEffect(() => {
    if (!lightbox) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, showPrevious, showNext]);

  /* swipe support */
  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) showPrevious();
    else showNext();
  };

  const onStageKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  };

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-container">
        {/* HEADER */}

        <div className="gallery-header">
          <div className="gallery-heading">
            <p className="gallery-label">VISTARA VALLEY</p>

            <h2>
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

        <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
          {categories.map((item, tabIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`gallery-tab-${item.id}`}
              aria-selected={activeTab === tabIndex}
              aria-controls={`gallery-panel-${item.id}`}
              className={`gallery-tab ${activeTab === tabIndex ? "is-active" : ""}`}
              onClick={() => changeTab(tabIndex)}
            >
              {item.label}
              <sup>{pad(item.slides.length)}</sup>
            </button>
          ))}
        </div>

        {/* SLIDER */}

        <div
          className="gallery-slider"
          role="tabpanel"
          id={`gallery-panel-${category.id}`}
          aria-labelledby={`gallery-tab-${category.id}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <p className="gallery-tagline" key={category.id}>
            {category.tagline}
          </p>

          <div
            className="gallery-stage"
            tabIndex={0}
            onKeyDown={onStageKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="gallery-slide" key={`${category.id}-${index}`}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1280px) 92vw, 1240px"
                priority={activeTab === 0 && index === 0}
                className="gallery-slide-image"
              />
            </div>

            <button
              type="button"
              className="gallery-open"
              onClick={() => setLightbox(true)}
              aria-label="Open image fullscreen"
            />
          </div>

          <div className="gallery-progress" aria-hidden="true">
            <span
              key={`${activeTab}-${index}-${running}`}
              className={`gallery-progress-bar ${running ? "is-running" : ""}`}
              style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
            />
          </div>

          {/* CAPTION + CONTROLS */}

          <div className="gallery-bar">
            <div className="gallery-caption" aria-live="polite">
              <span className="gallery-caption-eyebrow">
                {category.label} — {pad(index + 1)}
              </span>
              <span className="gallery-caption-title">{slide.caption}</span>
            </div>

            <div className="gallery-controls">
              <button
                type="button"
                className="gallery-control gallery-control-small"
                onClick={() => setAutoplay((value) => !value)}
                aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
              >
                {autoplay ? <Pause /> : <Play />}
              </button>

              <button
                type="button"
                className="gallery-control"
                onClick={showPrevious}
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>

              <span className="gallery-count">
                <strong>{pad(index + 1)}</strong>
                <i />
                {pad(total)}
              </span>

              <button
                type="button"
                className="gallery-control"
                onClick={showNext}
                aria-label="Next image"
              >
                <ArrowRight />
              </button>

              <button
                type="button"
                className="gallery-control gallery-control-small"
                onClick={() => setLightbox(true)}
                aria-label="View fullscreen"
              >
                <Expand />
              </button>
            </div>
          </div>

          {/* THUMBNAILS */}

          <div className="gallery-thumbs" ref={thumbsRef}>
            {slides.map((item, thumbIndex) => (
              <button
                key={item.src}
                type="button"
                ref={(element) => {
                  thumbRefs.current[thumbIndex] = element;
                }}
                className={`gallery-thumb ${thumbIndex === index ? "is-active" : ""}`}
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Show image ${thumbIndex + 1}: ${item.caption}`}
                aria-current={thumbIndex === index}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="140px"
                  className="gallery-thumb-image"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}

      {lightbox && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={slide.caption}
          onClick={() => setLightbox(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="gallery-close"
            onClick={() => setLightbox(false)}
            aria-label="Close gallery"
          >
            <Close />
          </button>

          <button
            type="button"
            className="gallery-navigation gallery-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            <ArrowLeft />
          </button>

          <div
            className="gallery-lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="gallery-lightbox-image"
            />
          </div>

          <button
            type="button"
            className="gallery-navigation gallery-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <ArrowRight />
          </button>

          <div className="gallery-lightbox-caption">
            <span>{slide.caption}</span>
            <small>
              {pad(index + 1)} / {pad(total)}
            </small>
          </div>
        </div>
      )}
    </section>
  );
}