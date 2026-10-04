"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./Location.css";

/* ---------- master plan files ---------- */

const MASTER_PLAN_IMG = "/images/master-plan.jpg";
const MASTER_PLAN_PDF = "/downloads/vistara-valley-master-plan.pdf";
const MASTER_PLAN_ALT =
  "Vistara Valley master plan showing residential and commercial plots, roads and garden on Khandwa Road, Khargone";

/*
  ✏️ Distances are approximate and come from the project owner.
  Sorted nearest first. To add a place later, add a line here.
*/
const places = [
  { name: "Nearby Petrol Pump", distance: "500 m" },
  { name: "Nearby Hospital", distance: "500 m" },
  { name: "Bank / ATM", distance: "1 km" },
  { name: "Khargone City Centre / Main Market", distance: "1.5 km" },
  { name: "Khargone Bus Stand", distance: "1.5 km" },
  { name: "Collectorate / District Court", distance: "2 km" },
  { name: "Bhandari Public School", distance: "2 km" },
  { name: "D-Mart", distance: "2 km" },
];

const highlights = [
  "30, 40 & 70 ft roads",
  "Central landscaped garden",
  "Residential & commercial plots",
];

const MAP_EMBED =
  "https://www.google.com/maps?q=21.826806,75.635167&z=15&output=embed";
const MAP_OPEN =
  "https://www.google.com/maps/search/?api=1&query=21.826806,75.635167";
const MAP_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=21.826806,75.635167";

/* tells search engines where the project is */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "Vistara Valley",
  description:
    "Residential and commercial plotted colony on Khandwa Road, Khargone, Madhya Pradesh.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khandwa Road",
    addressLocality: "Khargone",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.826806,
    longitude: 75.635167,
  },
};

/* ---------- small icons ---------- */

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11" />
    <path d="M7.5 11l4.5 4.5 4.5-4.5" />
    <path d="M4 20h16" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export default function Location() {
  const [planOpen, setPlanOpen] = useState(false);

  /* lightbox: Esc to close, lock page scroll */
  useEffect(() => {
    if (!planOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlanOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [planOpen]);

  return (
    <>
      {/* =========================
          MASTER PLAN
      ========================= */}

      <section
        className="masterplan"
        id="master-plan"
        aria-labelledby="masterplan-title"
      >
        <div className="masterplan-container">
          <div className="masterplan-content">
            <p className="masterplan-label">MASTER PLAN</p>

            <h2 id="masterplan-title">
              Well Planned,
              <br />
              Thoughtfully Designed.
            </h2>

            <p className="masterplan-description">
              Our master plan ensures maximum space, better ventilation and a
              harmonious layout for a premium living experience.
            </p>

            <ul className="masterplan-highlights">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="masterplan-actions">
              <button
                type="button"
                className="masterplan-button"
                onClick={() => setPlanOpen(true)}
              >
                <span>View Full Plan</span>
                <strong aria-hidden="true">→</strong>
              </button>

              <div className="masterplan-downloads">
                <a
                  href={MASTER_PLAN_IMG}
                  download="Vistara-Valley-Master-Plan.jpg"
                  className="masterplan-download"
                >
                  <DownloadIcon />
                  <span>Download JPG</span>
                </a>

                <a
                  href={MASTER_PLAN_PDF}
                  download="Vistara-Valley-Master-Plan.pdf"
                  className="masterplan-download"
                >
                  <DownloadIcon />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="masterplan-visual"
            onClick={() => setPlanOpen(true)}
            aria-label="Open Vistara Valley master plan fullscreen"
          >
            <Image
              src={MASTER_PLAN_IMG}
              alt={MASTER_PLAN_ALT}
              width={3720}
              height={3480}
              sizes="(max-width: 1000px) 92vw, 760px"
              className="masterplan-image"
            />

            <span className="masterplan-view-label">
              <ExpandIcon />
              Click to enlarge
            </span>
          </button>
        </div>
      </section>

      {/* =========================
          LOCATION
      ========================= */}

      <section
        className="location"
        id="location"
        aria-labelledby="location-title"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <div className="location-container">
          <div className="location-header">
            <p className="location-label">STRATEGIC LOCATION</p>

            <h2 id="location-title">
              Everything Within
              <br />
              Easy Reach
            </h2>

            <p className="location-intro">
              Vistara Valley sits on Khandwa Road, Khargone, close to the
              market, bus stand, hospital, schools and daily essentials, so
              everything you need is just minutes away.
            </p>
          </div>

          <div className="location-grid">
            <div className="location-table-card">
              <table className="location-table">
                <caption className="location-sr-only">
                  Approximate distance from Vistara Valley to nearby places in
                  Khargone
                </caption>

                <thead>
                  <tr>
                    <th scope="col">Destination / Landmark</th>
                    <th scope="col">Approx. Distance</th>
                  </tr>
                </thead>

                <tbody>
                  {places.map((place) => (
                    <tr key={place.name}>
                      <th scope="row">{place.name}</th>
                      <td>{place.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="location-upcoming">
                <span className="location-upcoming-tag">Upcoming</span>

                <p>
                  <strong>NH-347B widening &amp; Khargone bypass.</strong> In
                  June 2026 the Union Cabinet approved ₹4,415.60 crore to
                  widen the 108.6 km Deshgaon–Julwaniya stretch to four lanes,
                  with a 16.2 km greenfield bypass around Khargone.
                  Construction timelines are set by the authorities.{" "}
                  <a
                    href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2268359"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source: PIB
                  </a>
                </p>
              </div>
            </div>

            <div className="location-map-card">
              <iframe
                src={MAP_EMBED}
                title="Vistara Valley location on Google Maps"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="location-map-actions">
                <a href={MAP_OPEN} target="_blank" rel="noopener noreferrer">
                  Open in Maps
                </a>

                <a
                  href={MAP_DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="is-primary"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <p className="location-note">
            Distances are approximate and measured from the project site.
          </p>
        </div>
      </section>

      {/* =========================
          MASTER PLAN FULLSCREEN
      ========================= */}

      {planOpen && (
        <div
          className="mp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vistara Valley master plan"
          onClick={() => setPlanOpen(false)}
        >
          <div className="mp-lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <a
              href={MASTER_PLAN_IMG}
              download="Vistara-Valley-Master-Plan.jpg"
              className="mp-lightbox-download"
            >
              <DownloadIcon />
              <span>Download</span>
            </a>

            <button
              type="button"
              className="mp-lightbox-close"
              onClick={() => setPlanOpen(false)}
              aria-label="Close master plan"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mp-lightbox-scroll">
            <Image
              src={MASTER_PLAN_IMG}
              alt={MASTER_PLAN_ALT}
              width={3720}
              height={3480}
              sizes="100vw"
              quality={90}
              className="mp-lightbox-image"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}