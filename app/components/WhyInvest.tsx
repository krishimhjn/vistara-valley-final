import "./WhyInvest.css";

/*
  ✏️ Optional: put your RERA registration number here.
  When it is filled in, it is shown on the first card.
  Example: "P-KGN-XX-XXXX"
*/
const RERA_NUMBER = "";

/*
  ✏️ Edit the wording below. Keep only claims you can back up
  with documents or an official source.
*/
const reasons = [
  {
    title: "RERA & TNCP Approved",
    text: "The layout is approved by the Town and Country Planning department and registered under RERA, so buyers get transparent documentation. Approval details are shared on request or at your site visit.",
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
    showRera: true,
  },
  {
    title: "Highway Upgrade & Khargone Bypass",
    text: "The Union Cabinet has approved four-laning of the NH-347B corridor and a 16.2 km greenfield bypass around Khargone. Better connectivity supports long-term growth potential for the region.",
    icon: (
      <>
        <path d="M7.5 21L10.4 3" />
        <path d="M16.5 21L13.6 3" />
        <path d="M12 4.5v3" />
        <path d="M12 10v3" />
        <path d="M12 15.5v4" />
      </>
    ),
  },
  {
    title: "Prime Location, Daily Needs Nearby",
    text: "On Khandwa Road with the city market, bus stand, hospital, schools, bank and D-Mart all within about 2 km, so everyday life is convenient from day one.",
    icon: (
      <>
        <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  {
    title: "Clear Documents & Bank Finance",
    text: "Title and layout documents are ready for you to verify before you decide, and bank loan assistance is available for eligible buyers.",
    icon: (
      <>
        <path d="M3 10l9-6 9 6" />
        <path d="M5.5 10v8" />
        <path d="M10 10v8" />
        <path d="M14 10v8" />
        <path d="M18.5 10v8" />
        <path d="M3 20.5h18" />
      </>
    ),
  },
];

export default function WhyInvest() {
  return (
    <section
      className="why-invest"
      id="why-invest"
      aria-labelledby="why-invest-title"
    >
      <div className="why-invest-container">
        {/* HEADER */}

        <div className="why-invest-header">
          <p className="why-invest-label">INVESTMENT ADVANTAGE</p>

          <h2 id="why-invest-title">Why Invest in Plots in Khargone?</h2>

          <p className="why-invest-intro">
            Key reasons buyers choose Vistara Valley, a residential and
            commercial plotted colony on Khandwa Road, Khargone.
          </p>
        </div>

        {/* CARDS */}

        <ol className="why-invest-grid">
          {reasons.map((item, index) => (
            <li className="why-invest-card" key={item.title}>
              <div className="why-invest-top">
                <span className="why-invest-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="why-invest-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    focusable="false"
                  >
                    {item.icon}
                  </svg>
                </span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              {item.showRera && RERA_NUMBER && (
                <p className="why-invest-rera">RERA No: {RERA_NUMBER}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}