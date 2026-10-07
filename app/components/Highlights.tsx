import "./Highlights.css";

/*
  ✏️ Edit the wording here.
  Only keep a claim if you can back it up with documents or facts.
*/
const highlights = [
  {
    title: "100% Clear Title",
    text: "Documents ready to verify",
    icon: (
      <>
        <path d="M6 3h8.5L19 7.5V21H6z" />
        <path d="M14.5 3v4.5H19" />
        <path d="M9 14.2l2.2 2.2 4.3-4.6" />
      </>
    ),
  },
  {
    title: "High Capital Growth",
    text: "A fast-developing location",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
  },
  {
    title: "Bank Finance Available",
    text: "Easy plot loan support",
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
  {
    title: "Special Economic Zone",
    text: "Close to industrial growth",
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V10.5l5 3v-3l5 3V7h4v14" />
        <path d="M8 17h1.5" />
        <path d="M13 17h1.5" />
      </>
    ),
  },
];

export default function Highlights() {
  return (
    <section className="highlights" aria-label="Project highlights">
      <ul className="highlights-container">
        {highlights.map((item) => (
          <li className="highlight-item" key={item.title}>
            <span className="highlight-icon" aria-hidden="true">
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

            <span className="highlight-text">
              <strong>{item.title}</strong>
              <small>{item.text}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}