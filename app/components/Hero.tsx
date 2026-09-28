import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-background" aria-hidden="true" />

      <div className="hero-overlay" />

      <header className="hero-navbar">
        <a href="#home" className="hero-logo">
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
          className="hero-menu-button"
          type="button"
          aria-label="Open navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className="hero-content">
        <p className="hero-label">
          Premium Residential &amp; Commercial Plots
        </p>

        <h1>Life in the city</h1>

        <p className="hero-description">
          Discover Vistara Valley, a premium residential and commercial
          plotted development on Khandwa Road, Khargone, designed for
          modern living, business opportunities and a well-connected
          lifestyle.
        </p>

        <a href="#contact" className="hero-primary-button">
          Book a Site Visit
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="hero-trust">
        <div>
          <strong>RERA</strong>
          <span>Approved</span>
        </div>

        <div>
          <strong>TNCP</strong>
          <span>Approved</span>
        </div>

        <div>
          <strong>KHANDWA ROAD</strong>
          <span>Khargone</span>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}