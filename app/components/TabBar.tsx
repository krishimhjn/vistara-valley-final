"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./TabBar.css";

/*
  ✏️ The tabs. `id` must match the section id on your page.
*/
const tabs = [
  {
    id: "home",
    label: "Home",
    icon: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    id: "master-plan",
    label: "Plan",
    icon: (
      <>
        <path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z" />
        <path d="M9 4v13.5" />
        <path d="M15 6.5V20" />
      </>
    ),
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.7" />
        <path d="M21 16l-5-5-8 9" />
      </>
    ),
  },
  {
    id: "location",
    label: "Location",
    icon: (
      <>
        <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
];

/* how long after the last scroll the bar comes back (milliseconds) */
const SHOW_AFTER_IDLE = 700;

export default function TabBar() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);
  const idleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* highlight the tab of the section currently in the middle of the screen */
  useEffect(() => {
    if (!mounted) return;

    const elements = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);

  /* hide while scrolling down, come back on scroll up or when scrolling stops */
  useEffect(() => {
    if (!mounted) return;

    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastY.current = y;
      ticking.current = false;

      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(
        () => setHidden(false),
        SHOW_AFTER_IDLE
      );
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === active)
  );

  return createPortal(
    <nav
      className={`tabbar ${hidden ? "is-hidden" : ""}`}
      style={{ "--i": activeIndex } as React.CSSProperties}
      aria-label="Quick navigation"
    >
      {/* sliding glass pill behind the active tab */}
      <span className="tabbar-pill" aria-hidden="true" />

      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className={`tabbar-item ${active === tab.id ? "is-active" : ""}`}
          aria-current={active === tab.id ? "true" : undefined}
          onClick={() => setActive(tab.id)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            {tab.icon}
          </svg>

          <span>{tab.label}</span>
        </a>
      ))}
    </nav>,
    document.body
  );
}