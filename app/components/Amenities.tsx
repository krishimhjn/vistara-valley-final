import "./Amenities.css";

type IconName =
  | "park"
  | "road"
  | "play"
  | "green"
  | "light"
  | "security"
  | "entrance"
  | "utility";

const amenities: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Landscaped Parks",
    description: "Beautifully planned green spaces for everyday relaxation.",
    icon: "park",
  },
  {
    title: "Wide Internal Roads",
    description: "Spacious internal roads designed for smooth movement.",
    icon: "road",
  },
  {
    title: "Children's Play Area",
    description: "A dedicated space for children to play and enjoy.",
    icon: "play",
  },
  {
    title: "Green Open Spaces",
    description: "Open green areas that bring nature closer to home.",
    icon: "green",
  },
  {
    title: "Street Lighting",
    description: "Well-planned lighting across the internal spaces.",
    icon: "light",
  },
  {
    title: "24×7 Security",
    description: "Security provisions for greater peace of mind.",
    icon: "security",
  },
  {
    title: "2 Grand Entrances",
    description: "Two prominent entrances providing convenient access.",
    icon: "entrance",
  },
  {
    title: "Underground Utilities",
    description: "Electricity, water and drainage lines planned underground.",
    icon: "utility",
  },
];

/* ---------- line icons (24 x 24, drawn with currentColor) ---------- */

const icons: Record<IconName, React.ReactNode> = {
  /* tree */
  park: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6" />
      <path d="M8.5 21h7" />
      <path d="M12 13l-2.2-2.2" />
      <path d="M12 11.5l2.2-2.2" />
    </>
  ),

  /* road in perspective */
  road: (
    <>
      <path d="M8.5 21L10.6 3h2.8l2.1 18" />
      <path d="M12 5v2.5" />
      <path d="M12 11v2.5" />
      <path d="M12 17v2.5" />
    </>
  ),

  /* swing set */
  play: (
    <>
      <path d="M3 4h18" />
      <path d="M5 4l-2 17" />
      <path d="M19 4l2 17" />
      <path d="M9 4v11" />
      <path d="M15 4v11" />
      <path d="M7.4 15.5h3.2" />
      <path d="M13.4 15.5h3.2" />
    </>
  ),

  /* sprouting plant */
  green: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 14c0-3.6-2.8-5.6-7-5.6 0 3.6 2.2 5.6 7 5.6z" />
      <path d="M12 11.5C12 7.6 15 4.5 19.5 4.5c0 4-2.6 7-7.5 7z" />
      <path d="M8.5 21h7" />
    </>
  ),

  /* street lamp */
  light: (
    <>
      <path d="M8 3.5h8l-1.6 5.5H9.6z" />
      <path d="M12 9v12" />
      <path d="M9 21h6" />
      <path d="M4.5 4.5L3 3.5" />
      <path d="M19.5 4.5l1.5-1" />
      <path d="M5 8.5H3" />
      <path d="M19 8.5h2" />
    </>
  ),

  /* shield with check */
  security: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),

  /* gateway arch */
  entrance: (
    <>
      <path d="M4 21V10" />
      <path d="M20 21V10" />
      <path d="M4 10a8 7 0 0 1 16 0" />
      <path d="M2 21h20" />
      <path d="M9.5 21v-8" />
      <path d="M14.5 21v-8" />
    </>
  ),

  /* buried pipe */
  utility: (
    <>
      <path d="M3 7.5h18" />
      <path d="M6 5l1.5 2.5L9 5" />
      <rect x="3" y="12.5" width="18" height="6.5" rx="3.25" />
      <path d="M9 12.5V19" />
      <path d="M15 12.5V19" />
    </>
  ),
};

function AmenityIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}

export default function Amenities() {
  return (
    <section className="amenities" id="amenities">
      <div className="amenities-container">

        {/* LEFT CONTENT */}
        <div className="amenities-content">
          <p className="amenities-label">
            WORLD-CLASS AMENITIES
          </p>

          <h2>
            Everything You Need,
            <br />
            Right Here
          </h2>

          <p className="amenities-description">
            From thoughtfully landscaped spaces to essential infrastructure,
            Vistara Valley brings together the features designed for
            comfortable, convenient and well-planned living.
          </p>

          <a
            href="#amenities-list"
            className="amenities-button"
          >
            <span>View All Amenities</span>
            <strong>→</strong>
          </a>
        </div>

        {/* AMENITY GRID */}
        <div
          className="amenities-grid"
          id="amenities-list"
        >
          {amenities.map((amenity) => (
            <div
              className="amenity-card"
              key={amenity.title}
            >
              <div className="amenity-icon" aria-hidden="true">
                <AmenityIcon name={amenity.icon} />
              </div>

              <div className="amenity-card-content">
                <h3>{amenity.title}</h3>
                <p>{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}