import "./MasterLocation.css";

export default function MasterLocation() {
  return (
    <section className="master-location" id="master-plan">
      <div className="master-location-container">

        {/* =========================
            MASTER PLAN
        ========================= */}

        <article className="master-location-card">
          <div className="master-location-content">
            <p className="master-location-label">
              MASTER PLAN
            </p>

            <h2>
              Well Planned,
              <br />
              Thoughtfully Designed.
            </h2>

            <p className="master-location-description">
              Our master plan ensures maximum space, better ventilation
              and a harmonious layout for a premium living experience.
            </p>

            <a
              href="#master-plan-image"
              className="master-location-button"
            >
              <span>View Master Plan</span>
              <strong>→</strong>
            </a>
          </div>

          <div
            className="master-location-visual"
            id="master-plan-image"
          >
            <img
              src="/images/master-plan.jpg"
              alt="Vistara Valley master plan"
            />
          </div>
        </article>


        {/* =========================
            LOCATION
        ========================= */}

        <article
          className="master-location-card"
          id="location"
        >
          <div className="master-location-content">
            <p className="master-location-label">
              LOCATION
            </p>

            <h2>
              Connected to
              <br />
              What Matters
            </h2>

            <p className="master-location-description">
              Enjoy the best of both worlds — peaceful living with easy
              access to the city&apos;s key destinations.
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.826806,75.635167"
              target="_blank"
              rel="noopener noreferrer"
              className="master-location-button"
            >
              <span>View Location</span>
              <strong>→</strong>
            </a>
          </div>

          <div
            className="master-location-visual location-visual"
            id="location-map"
          >
            <iframe
              src="https://www.google.com/maps?q=21.826806,75.635167&z=15&output=embed"
              title="Vistara Valley location on Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </article>

      </div>
    </section>
  );
}