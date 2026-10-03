"use client";

import { useEffect, useState } from "react";
import "./Hero.css";

/* ---------- info card icons (24 x 24 line icons) ---------- */

const infoIcons = {
  plots: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 9.5h18" />
      <path d="M3 15.5h18" />
      <path d="M9 3v6.5" />
      <path d="M15 3v6.5" />
      <path d="M12 15.5V21" />
      <rect
        x="9.2"
        y="9.7"
        width="5.6"
        height="5.6"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="none"
      />
    </>
  ),

  mix: (
    <>
      <path d="M2 21h20" />
      <path d="M3 12.5L7.5 8.5 12 12.5" />
      <path d="M4.5 21v-8.2" />
      <path d="M10.5 21v-8.2" />
      <path d="M6.3 21v-4.2h2.4V21" />
      <rect x="13.5" y="4" width="7.5" height="17" rx="0.8" />
      <path d="M16 8h1.2" />
      <path d="M18.3 8h1.2" />
      <path d="M16 11.5h1.2" />
      <path d="M18.3 11.5h1.2" />
      <path d="M16 15h1.2" />
      <path d="M18.3 15h1.2" />
    </>
  ),

  road: (
    <>
      <path d="M7.5 21L10.4 3" />
      <path d="M16.5 21L13.6 3" />
      <path d="M12 4.5v3" />
      <path d="M12 10v3" />
      <path d="M12 15.5v4" />
    </>
  ),

  approval: (
    <>
      <path d="M6 3h8.5L19 7.5V21H6z" />
      <path d="M14.5 3v4.5H19" />
      <path d="M9 11.5h6" />
      <path d="M9 14.5h3" />
      <path d="M12.2 19l1.8 1.8 3.4-3.8" />
    </>
  ),
};

function InfoIcon({ name }: { name: keyof typeof infoIcons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {infoIcons[name]}
    </svg>
  );
}

/* ---------- navigation links + their menu icons ---------- */

type MenuIcon = "about" | "amenities" | "plan" | "location" | "gallery" | "contact";

const navLinks: { href: string; label: string; icon: MenuIcon }[] = [
  { href: "#about", label: "About", icon: "about" },
  { href: "#amenities", label: "Amenities", icon: "amenities" },
  { href: "#master-plan", label: "Master Plan", icon: "plan" },
  { href: "#location", label: "Location", icon: "location" },
  { href: "#gallery", label: "Gallery", icon: "gallery" },
  { href: "#contact", label: "Contact", icon: "contact" },
];

const menuIcons: Record<MenuIcon, React.ReactNode> = {
  about: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.7v.1" />
    </>
  ),
  amenities: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6" />
      <path d="M8.5 21h7" />
    </>
  ),
  plan: (
    <>
      <path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z" />
      <path d="M9 4v13.5" />
      <path d="M15 6.5V20" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  gallery: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="M21 16l-5-5-8 9" />
    </>
  ),
  contact: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
};

function MenuSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="hero-mobile-arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* lock page scroll while the menu is open, close with Esc */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* close the menu if the screen grows to desktop size */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 761px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-background" aria-hidden="true" />

      <div className="hero-overlay" />

      {/* NAVBAR */}
      <header className="hero-navbar">
        <a href="#home" className="hero-logo" onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="Vistara Valley"
          />
        </a>

        <nav className="hero-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hero-nav-cta">
          Book a Site Visit
        </a>

        <button
          className={`hero-menu-button ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="hero-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* MOBILE MENU */}
      <div
        id="hero-mobile-menu"
        className={`hero-mobile-menu ${menuOpen ? "is-open" : ""}`}
      >
        <nav className="hero-mobile-links" aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="hero-mobile-link"
              style={{ "--i": index } as React.CSSProperties}
              onClick={closeMenu}
            >
              <span className="hero-mobile-icon">
                <MenuSvg>{menuIcons[link.icon]}</MenuSvg>
              </span>

              <span className="hero-mobile-label">{link.label}</span>

              <ArrowIcon />
            </a>
          ))}
        </nav>

        <div className="hero-mobile-footer">
          <a
            href="#contact"
            className="hero-mobile-menu-cta"
            onClick={closeMenu}
          >
            Book a Site Visit
            <ArrowIcon />
          </a>

          <p className="hero-mobile-address">Khandwa Road, Khargone</p>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <p className="hero-label">
          Premium Residential &amp; Commercial Plots
        </p>

        <h1>
          Life in the city
        </h1>

        <p className="hero-description">
          A thoughtfully planned community where modern living meets
          nature — giving you the perfect balance of comfort,
          convenience and calm.
        </p>

        <a href="#about" className="hero-primary-button">
          <span>Explore the Project</span>
          <strong aria-hidden="true">→</strong>
        </a>
      </div>

      {/* FLOATING INFORMATION CARD */}
      <div className="hero-info-card">

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <InfoIcon name="plots" />
          </div>

          <div className="hero-info-text">
            <span>Total Plots</span>
            <strong>220+</strong>
          </div>
        </div>

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <InfoIcon name="mix" />
          </div>

          <div className="hero-info-text">
            <span>Plot Mix</span>
            <strong>190+ Residential</strong>
            <small>30+ Commercial</small>
          </div>
        </div>

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <InfoIcon name="road" />
          </div>

          <div className="hero-info-text">
            <span>Internal Roads</span>
            <strong>30 ft, 40 ft &amp; up to 70 ft</strong>
          </div>
        </div>

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <InfoIcon name="approval" />
          </div>

          <div className="hero-info-text">
            <span>Approvals</span>
            <strong>RERA Approved</strong>
            <small>TNCP Approved</small>
          </div>
        </div>

      </div>
    </section>
  );
}