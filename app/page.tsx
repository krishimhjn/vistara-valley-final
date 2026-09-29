import Hero from "./components/Hero";
import ProjectIntro from "./components/ProjectIntro";
import Amenities from "./components/Amenities";
import MasterLocation from "./components/MasterLocation";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectIntro />
      <Amenities />
      <MasterLocation />
      <Gallery />
      <Contact />
    </main>
  );
}