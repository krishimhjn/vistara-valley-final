"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./Testimonials.css";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/*
  ⚠️ SAMPLE TEXT – replace every entry below with REAL feedback
  from your buyers (with their permission) before publishing.
*/
const testimonials: Testimonial[] = [
  {
    quote:
      "The layout is well planned, with wide roads and a proper garden. Clear approvals gave us the confidence to book.",
    name: "Buyer Name",
    role: "Residential plot owner",
  },
  {
    quote:
      "The site visit was smooth and every question was answered honestly. We could see exactly what we were buying.",
    name: "Buyer Name",
    role: "Residential plot owner",
  },
  {
    quote:
      "The Khandwa Road location is convenient, and the commercial plots near the entrance suited our business plans.",
    name: "Buyer Name",
    role: "Commercial plot owner",
  },
  {
    quote:
      "We liked that roads, utilities and green spaces were planned from the start, not added later.",
    name: "Buyer Name",
    role: "Residential plot owner",
  },
  {
    quote:
      "A professional team and a transparent process from the first enquiry to the final paperwork.",
    name: "Buyer Name",
    role: "Plot investor",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function QuoteIcon() {
  return (
    <svg
      className="testimonial-quote-icon"
      viewBox="0 0 32 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 24V13.6C0 6 4.4 1.2 11.6 0l1.2 3.6C8.8 5 6.8 7.6 6.4 11H12v13H0zm19 0V13.6C19 6 23.4 1.2 30.6 0l1.2 3.6C27.8 5 25.8 7.6 25.4 11H31v13H19z" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="testimonial-stars" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [dotCount, setDotCount] = useState(testimonials.length);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getStep = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 1;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;

    setActive(Math.min(Math.round(track.scrollLeft / step), Math.ceil(maxScroll / step)));
    setDotCount(Math.max(1, Math.ceil(maxScroll / step - 0.05) + 1));
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    update();

    const track = trackRef.current;
    track?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      track?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: direction * getStep(),
      behavior: "smooth",
    });
  };

  const scrollToDot = (index: number) => {
    trackRef.current?.scrollTo({
      left: index * getStep(),
      behavior: "smooth",
    });
  };

  return (
    <section
      className="testimonials"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-container">
        {/* HEADER */}

        <div className="testimonials-header">
          <div>
            <p className="testimonials-label">TESTIMONIALS</p>

            <h2 id="testimonials-title">What Our Buyers Say</h2>
          </div>

          <div className="testimonials-controls">
            <button
              type="button"
              className="testimonials-arrow"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous testimonials"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>

            <button
              type="button"
              className="testimonials-arrow"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next testimonials"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* CARDS */}

        <div
          className="testimonials-track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Customer testimonials"
        >
          {testimonials.map((item, index) => (
            <figure className="testimonial-card" key={index}>
              <QuoteIcon />

              <Stars />

              <blockquote>{item.quote}</blockquote>

              <figcaption>
                <span className="testimonial-avatar" aria-hidden="true">
                  {initials(item.name)}
                </span>

                <span className="testimonial-person">
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* DOTS */}

        <div className="testimonials-dots" aria-hidden="true">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              tabIndex={-1}
              className={`testimonials-dot ${index === active ? "is-active" : ""}`}
              onClick={() => scrollToDot(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}