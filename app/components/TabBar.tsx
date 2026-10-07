"use client";

import { useEffect, useState } from "react";
import "./TabBar.css";

/*
  ✏️ The tabs. `id` must match the section id on your page.
  To add a 5th tab, copy a line, e.g. Contact:
  { id: "contact", label: "Contact", icon: <path d="..." /> }
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

export default function TabBar() {
  const [active, setActive] = useState("home");

  /* highlight the tab of the section currently in the middle of the screen */
  useEffect(() => {
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
  }, []);

  return (
    <nav className="tabbar" aria-label="Quick navigation">
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
    </nav>
  );
}