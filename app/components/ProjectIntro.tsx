import "./ProjectIntro.css";

export default function ProjectIntro() {
  return (
    <section className="project-intro" id="about">
      <div className="project-intro-container">

        {/* LEFT CONTENT */}
        <div className="project-intro-content">
          <p className="project-intro-label">
            PREMIUM PLOTTED LIVING
          </p>

          <h2>
            A Better Way
            <br />
            of Living
          </h2>

          <p className="project-intro-description">
            Vistara Valley is designed for those who seek more than just a
            plot. It&apos;s a place where dreams, family and future come
            together.
          </p>

          <a
            href="#amenities"
            className="project-intro-button"
          >
            <span>Know More</span>
            <strong>→</strong>
          </a>
        </div>

        {/* RIGHT CARDS */}
        <div className="project-intro-cards">

          {/* RESIDENTIAL */}
          <a
            href="#residential"
            className="project-intro-card"
          >
            <div className="project-intro-card-image">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85"
                alt="Residential plots at Vistara Valley"
              />
            </div>

            <div className="project-intro-card-info">
              <div className="project-intro-card-icon residential-icon">
                <span />
              </div>

              <div className="project-intro-card-text">
                <h3>Residential Plots</h3>
                <p>
                  Build your dream home in a serene and secure environment.
                </p>
              </div>

              <span className="project-intro-card-arrow">
                →
              </span>
            </div>
          </a>

          {/* COMMERCIAL */}
          <a
            href="#commercial"
            className="project-intro-card"
          >
            <div className="project-intro-card-image">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
                alt="Commercial plots at Vistara Valley"
              />
            </div>

            <div className="project-intro-card-info">
              <div className="project-intro-card-icon commercial-icon">
                <span />
              </div>

              <div className="project-intro-card-text">
                <h3>Commercial Plots</h3>
                <p>
                  A great opportunity for business and investment.
                </p>
              </div>

              <span className="project-intro-card-arrow">
                →
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}