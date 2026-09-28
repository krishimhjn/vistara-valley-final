"use client";

import { useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
          <a href="#about">About</a>
          <a href="#amenities">Amenities</a>
          <a href="#master-plan">Master Plan</a>
          <a href="#location">Location</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
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
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* MOBILE MENU */}
      <div className={`hero-mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#amenities" onClick={closeMenu}>
          Amenities
        </a>

        <a href="#master-plan" onClick={closeMenu}>
          Master Plan
        </a>

        <a href="#location" onClick={closeMenu}>
          Location
        </a>

        <a href="#gallery" onClick={closeMenu}>
          Gallery
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        <a
          href="#contact"
          className="hero-mobile-menu-cta"
          onClick={closeMenu}
        >
          Book a Site Visit ↗
        </a>
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
            <span className="hero-icon-grid" />
          </div>

          <div className="hero-info-text">
            <span>Total Plots</span>
            <strong>220+</strong>
          </div>
        </div>

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <span className="hero-icon-expand" />
          </div>

          <div className="hero-info-text">
            <span>Plot Mix</span>
            <strong>190+ Residential</strong>
            <small>30+ Commercial</small>
          </div>
        </div>

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <span className="hero-icon-road" />
          </div>

          <div className="hero-info-text">
            <span>Internal Roads</span>
            <strong>30 ft, 40 ft &amp; up to 70 ft</strong>
          </div>
        </div>

        <div className="hero-info-item">
          <div className="hero-info-icon">
            <span className="hero-icon-check" />
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