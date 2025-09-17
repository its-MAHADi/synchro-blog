import SynchroFeatures from "./components/FeaturesOfSynchor/SynchroFeatures";
import SynchroWorks from "./components/HowSynchroWorks/SynchroWorks";
import Banner from "./components/Banner/Banner";
import Contact from "./components/Contact/Contact";
import PopularTopic from "./components/popularTopic/PopularTopic";

export default function Home() {
  return (
    <section>
      {/* banner */}
      <Banner />

      {/* Features of Synchor */}
      <SynchroFeatures />

      {/* How synchor works */}
      <SynchroWorks />

      {/* PopularTopic */}
      <PopularTopic />

      {/* contact page */}
      <Contact />
    </section>
  );
}
