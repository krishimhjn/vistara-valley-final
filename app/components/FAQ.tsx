"use client";

import { useState } from "react";
import "./FAQ.css";

/*
  Everything below is ONE source of truth: it is shown on the page
  AND sent to Google as FAQ structured data (JSON-LD).
  Google requires the two to match, so edit answers here only.

  ✏️  Before publishing: check every answer is true and current
  (plot sizes, availability, approvals). Add your RERA number
  where marked.
*/
const faqs = [
  {
    question: "Where is Vistara Valley located?",
    answer:
      "Vistara Valley is a planned residential and commercial plotted colony on Khandwa Road, Khargone, Madhya Pradesh. The project sits on the highway side of Khargone with direct road access, which makes it convenient for daily travel towards both Khargone city and Khandwa.",
  },
  {
    question: "What makes Vistara Valley a good residential colony in Khargone?",
    answer:
      "When comparing residential colonies in Khargone, buyers usually look at approvals, road width, amenities and location. Vistara Valley offers an approved layout (RERA and TNCP), wide internal roads of 30 ft and 40 ft with a 70 ft main road, a central landscaped garden, a children's play area, an open-air stage, street lighting, security and planned underground utilities, all on Khandwa Road.",
  },
  {
    question: "Is Vistara Valley RERA and TNCP approved?",
    answer:
      "Yes. Vistara Valley is RERA approved and its layout is approved by the Town and Country Planning (TNCP) department. Our team will share the registration details and approved layout plan on request or during your site visit.",
  },
  {
    question: "What plot sizes are available in Vistara Valley?",
    answer:
      "The layout includes residential plots in common sizes such as 20 ft × 50 ft, 20 ft × 60 ft and 20 ft × 70 ft, along with 12 ft × 35 ft 12 ft × 45 ft. Exact sizes and current availability change, so please contact us for the latest plot list.",
  },
  {
    question: "Are commercial plots available in Vistara Valley?",
    answer:
      "Yes. Along with residential plots, the project has commercial plots, making it suitable for shops and small businesses that want a location on Khandwa Road. Contact us for the commercial plots currently available.",
  },
  {
    question: "What amenities and roads does the colony have?",
    answer:
      "Internal roads are 30 ft wide, with a 40 ft road and a 70 ft main road. Amenities include landscaped gardens and parks, a children's play area, green open spaces, an open-air stage, street lighting, security provisions, two grand entrances and underground electricity, water and drainage lines.",
  },
  {
    question: "What is the price of a plot in Vistara Valley, and how do I book a site visit?",
    answer:
      "The price depends on the plot size, its position in the layout and its facing, so we share current rates directly. You can book a free site visit using the contact form on this page. Our team will show you the layout, the available plots and the approvals in person.",
  },
  {
    question: "What should I check before buying a plot in Khargone?",
    answer:
      "Before buying a plot in Khargone, check the RERA registration, the approved layout from the town planning department, a clear title and registry, road access and width, and the planned amenities. Visit the site in person and compare more than one colony. We do not promise returns, but we are happy to show every document before you decide.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      {/* structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="faq-container">
        {/* LEFT */}

        <div className="faq-intro">
          <p className="faq-label">FAQ</p>

          <h2 id="faq-title">
            Questions Buyers
            <br />
            Ask Us
          </h2>

          <p className="faq-description">
            Everything you want to know about plots, approvals and amenities
            at Vistara Valley, a residential and commercial colony on Khandwa
            Road, Khargone.
          </p>

          <a href="#contact" className="faq-button">
            <span>Book a Site Visit</span>
            <strong aria-hidden="true">→</strong>
          </a>
        </div>

        {/* RIGHT */}

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                key={item.question}
              >
                <h3>
                  <button
                    type="button"
                    className="faq-question"
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.question}</span>

                    <span className="faq-toggle" aria-hidden="true" />
                  </button>
                </h3>

                {/* answers stay in the page so search engines can read them */}
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}