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

const Close = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export default function Gallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const category = categories[activeTab];
  const slides = category.slides;
  const slide = slides[index];
  const total = slides.length;

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

  /* on phones the panels scroll sideways, so keep the open one centred */
  useEffect(() => {
    const container = panelsRef.current;
    const panel = panelRefs.current[index];
    if (!container || !panel) return;

    container.scrollTo({
      left: panel.offsetLeft - (container.clientWidth - panel.clientWidth) / 2,
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

  /* swipe support (lightbox only, panels use native scrolling on phones) */
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

  /* click a closed panel to open it, click the open one for fullscreen */
  const onPanelClick = (panelIndex: number) => {
    if (panelIndex === index) setLightbox(true);
    else setIndex(panelIndex);
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

        {/* EXPANDING PANELS */}

        <div
          role="tabpanel"
          id={`gallery-panel-${category.id}`}
          aria-labelledby={`gallery-tab-${category.id}`}
        >
          <div className="gallery-panels" ref={panelsRef}>
            {slides.map((item, panelIndex) => {
              const isOpen = panelIndex === index;

              return (
                <button
                  key={`${category.id}-${item.src}`}
                  type="button"
                  ref={(element) => {
                    panelRefs.current[panelIndex] = element;
                  }}
                  className={`gallery-panel ${isOpen ? "is-open" : ""}`}
                  onClick={() => onPanelClick(panelIndex)}
                  aria-current={isOpen}
                  aria-label={
                    isOpen
                      ? `${item.caption} – open fullscreen`
                      : `Show ${item.caption}`
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 760px) 80vw, 900px"
                    priority={activeTab === 0 && panelIndex === 0}
                    className="gallery-panel-image"
                  />

                  <span className="gallery-panel-number">
                    {pad(panelIndex + 1)}
                  </span>

                  <span className="gallery-panel-caption">
                    <span className="gallery-caption-eyebrow">
                      {category.label} — {pad(panelIndex + 1)}
                    </span>
                    <span className="gallery-caption-title">{item.caption}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* CONTROLS */}

          <div className="gallery-bar">
            <p className="gallery-tagline" key={category.id}>
              {category.tagline}
            </p>

            <div className="gallery-controls">
              <button
                type="button"
                className="gallery-control"
                onClick={showPrevious}
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>

              <span className="gallery-count" aria-live="polite">
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