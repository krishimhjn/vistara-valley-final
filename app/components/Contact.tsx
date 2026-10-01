"use client";

import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        {/* MAIN CONTACT AREA */}
        <div className="contact-main">

          {/* LEFT CONTENT */}
          <div className="contact-heading">
            <p className="contact-label">
              BOOK A SITE VISIT
            </p>

            <h2>
              Ready to Take
              <br />
              the Next Step?
            </h2>

            <p className="contact-description">
              Discover Vistara Valley in person and explore a thoughtfully
              planned residential and commercial destination on Khandwa Road,
              Khargone.
            </p>

            <a
              href="https://wa.me/919977048537"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp"
            >
              <span>Chat on WhatsApp</span>
              <strong>↗</strong>
            </a>

            <a
              href="tel:+919977048537"
              className="contact-phone"
            >
              <span>Call +91 99770 48537</span>
              <strong>↗</strong>
            </a>
          </div>

          {/* FORM CARD */}
          <div className="contact-form-card">

            <div className="contact-form-header">
              <span>GET IN TOUCH</span>

              <h3>
                Plan Your Visit
              </h3>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                alert(
                  "Thank you. We will contact you shortly."
                );
              }}
            >

              {/* NAME + PHONE */}
              <div className="contact-form-row">

                <div className="contact-field">
                  <label htmlFor="name">
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

              </div>

              {/* INTEREST */}
              <div className="contact-field">

                <label htmlFor="interest">
                  I&apos;m Interested In
                </label>

                <select
                  id="interest"
                  name="interest"
                  defaultValue=""
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Select an option
                  </option>

                  <option value="residential">
                    Residential Plots
                  </option>

                  <option value="commercial">
                    Commercial Plots
                  </option>

                  <option value="both">
                    Residential & Commercial
                  </option>
                </select>

              </div>

              {/* MESSAGE */}
              <div className="contact-field">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us how we can help"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="contact-submit"
              >
                <span>
                  Request a Site Visit
                </span>

                <strong>
                  →
                </strong>
              </button>

            </form>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="contact-footer">

          {/* BRAND */}
          <div className="contact-footer-brand">

            <img
              src="/images/logo.png"
              alt="Vistara Valley"
            />

            <p>
              Premium residential & commercial plots
              <br />
              on Khandwa Road, Khargone.
            </p>

          </div>

          {/* FOOTER LINKS */}
          <div className="contact-footer-links">

            <div>
              <span>
                EXPLORE
              </span>

              <a href="#about">
                About
              </a>

              <a href="#amenities">
                Amenities
              </a>

              <a href="#master-plan">
                Master Plan
              </a>

              <a href="#gallery">
                Gallery
              </a>
            </div>

            <div>
              <span>
                CONNECT
              </span>

              <a href="#location">
                Location
              </a>

              <a href="#contact">
                Contact
              </a>

              <a href="#contact">
                Book a Site Visit
              </a>

              <a
                href="https://wa.me/919977048537"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>

          </div>

          {/* LOCATION + CONTACT */}
          <div className="contact-footer-location">

            <span>
              LOCATION
            </span>

            <p>
              Khandwa Road,
              <br />
              Khargone, Madhya Pradesh
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.826806,75.635167"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions ↗
            </a>

            <a
              href="tel:+919977048537"
              className="contact-footer-phone"
            >
              +91 99770 48537
            </a>

          </div>

        </footer>

        {/* APPROVAL INFORMATION */}
        <div className="contact-approvals">

          <div className="contact-approval-item">
            <span>
              TNCP APPROVAL
            </span>

            <strong>
              KRNLP18112508258
            </strong>
          </div>

          <div className="contact-approval-item">
            <span>
              RERA REGISTRATION
            </span>

            <strong>
              Details to be updated
            </strong>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="contact-bottom">

          <span>
            © {new Date().getFullYear()} Vistara Valley.
            All rights reserved.
          </span>

          <span>
            Designed for better living.
          </span>

        </div>

      </div>
    </section>
  );
}