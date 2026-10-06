import "./BookingCTA.css";

/* ✏️ edit these */
const PHONE_DISPLAY = "+91 99770 48537";
const PHONE_LINK = "tel:+919977048537";

export default function BookingCTA() {
  return (
    <section className="booking-cta" aria-labelledby="booking-cta-title">
      <div className="booking-cta-container">
        <div className="booking-cta-text">
          <h2 id="booking-cta-title">Ready to Book Your Dream Plot?</h2>

          <p>
            Speak to our team or schedule a free site visit today. Plot
            availability changes, so call us for the latest list.
          </p>
        </div>

        <div className="booking-cta-actions">
          <a href="#contact" className="booking-cta-button is-outline">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M21 3L10.5 13.5" />
              <path d="M21 3l-6.5 18-4-7.5L3 9.5z" />
            </svg>
            <span>Enquire Now</span>
          </a>

          <a href={PHONE_LINK} className="booking-cta-button is-solid">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
}