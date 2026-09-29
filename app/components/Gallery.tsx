"use client";

import { useState } from "react";
import "./Gallery.css";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Premium residential development",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    alt: "Modern residential architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
    alt: "Premium landscaped property",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    alt: "Modern community surroundings",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=85",
    alt: "Contemporary residential property",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85",
    alt: "Premium residential exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    alt: "Elegant property landscaping",
  },
  {
    src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85",
    alt: "Modern premium living space",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const showPrevious = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === 0
        ? galleryImages.length - 1
        : selectedImage - 1
    );
  };

  const showNext = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === galleryImages.length - 1
        ? 0
        : selectedImage + 1
    );
  };

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-container">

        {/* HEADER */}

        <div className="gallery-header">
          <div className="gallery-heading">
            <p className="gallery-label">
              VISTARA VALLEY
            </p>

            <h2>
              A Glimpse Into
              <br />
              Life Here
            </h2>
          </div>

          <div className="gallery-intro">
            <p>
              Explore the spaces, surroundings and thoughtfully planned
              lifestyle that make Vistara Valley a distinctive destination
              on Khandwa Road, Khargone.
            </p>
          </div>
        </div>

        {/* GALLERY GRID */}

        <div className="gallery-grid">

          {/* FEATURED IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-featured"
            onClick={() => setSelectedImage(0)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* SECOND IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-second"
            onClick={() => setSelectedImage(1)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* THIRD IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-third"
            onClick={() => setSelectedImage(2)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* FOURTH IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-fourth"
            onClick={() => setSelectedImage(3)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* FIFTH IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-fifth"
            onClick={() => setSelectedImage(4)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* SIXTH IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-sixth"
            onClick={() => setSelectedImage(5)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[5].src}
              alt={galleryImages[5].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* SEVENTH IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-seventh"
            onClick={() => setSelectedImage(6)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[6].src}
              alt={galleryImages[6].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

          {/* EIGHTH IMAGE */}

          <button
            type="button"
            className="gallery-item gallery-eighth"
            onClick={() => setSelectedImage(7)}
            aria-label="Open gallery image"
          >
            <img
              src={galleryImages[7].src}
              alt={galleryImages[7].alt}
            />

            <span className="gallery-overlay">
              <span className="gallery-expand">↗</span>
            </span>
          </button>

        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}

      {selectedImage !== null && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            ×
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
            ←
          </button>

          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="gallery-navigation gallery-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            →
          </button>

          <div className="gallery-counter">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}