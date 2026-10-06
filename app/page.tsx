import Hero from "./components/Hero";
import ProjectIntro from "./components/ProjectIntro";
import Amenities from "./components/Amenities";
import MasterLocation from "./components/Location";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import WhatsAppButton from "./components/WhatsAppButton";
import Reveal from "./components/Reveal";
import Highlights from "./Highlights";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",

  name: "Vistara Valley",

  description:
    "Premium residential and commercial plotted development on Khandwa Road, Khargone, Madhya Pradesh.",

  url: "https://www.vistaravalley.com",

  telephone: "+919977048537",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Khandwa Road",
    addressLocality: "Khargone",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.826806,
    longitude: 75.635167,
  },

  areaServed: {
    "@type": "City",
    name: "Khargone",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main>
        {/* hero plays its own entrance animation, so it is not wrapped */}
        <Hero />

<Reveal>
  <Highlights />
</Reveal>
        <Reveal>
          <ProjectIntro />
        </Reveal>

        <Reveal>
          <Gallery />
        </Reveal>

        <Reveal>
          <Amenities />
        </Reveal>

        <Reveal>
          <MasterLocation />
        </Reveal>

        <Reveal>
          <Testimonials />
        </Reveal>

        <Reveal>
          <FAQ />
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>
      </main>

      <WhatsAppButton />
    </>
  );
}