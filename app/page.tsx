import Hero from "./components/Hero";
import ProjectIntro from "./components/ProjectIntro";
import Amenities from "./components/Amenities";
import MasterLocation from "./components/MasterLocation";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectIntro />
      <Amenities />
      <MasterLocation />
    </main>
  );
}