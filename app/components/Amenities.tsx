import "./Amenities.css";

const amenities = [
  {
    title: "Landscaped Parks",
    description:
      "Beautifully planned green spaces for everyday relaxation.",
    icon: "park",
  },
  {
    title: "Wide Internal Roads",
    description:
      "Spacious internal roads designed for smooth movement.",
    icon: "road",
  },
  {
    title: "Children's Play Area",
    description:
      "A dedicated space for children to play and enjoy.",
    icon: "play",
  },
  {
    title: "Green Open Spaces",
    description:
      "Open green areas that bring nature closer to home.",
    icon: "green",
  },
  {
    title: "Street Lighting",
    description:
      "Well-planned lighting across the internal spaces.",
    icon: "light",
  },
  {
    title: "24×7 Security",
    description:
      "Security provisions for greater peace of mind.",
    icon: "security",
  },
  {
    title: "2 Grand Entrances",
    description:
      "Two prominent entrances providing convenient access.",
    icon: "entrance",
  },
  {
    title: "Underground Utilities",
    description:
      "Electricity, water and drainage lines planned underground.",
    icon: "utility",
  },
];

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
              <div className={`amenity-icon ${amenity.icon}`}>
                <span />
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