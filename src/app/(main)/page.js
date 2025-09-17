import SynchroFeatures from "./components/FeaturesOfSynchor/SynchroFeatures";
import SynchroWorks from "./components/HowSynchroWorks/SynchroWorks";
import PopularTopic from "./components/popularTopic/PopularTopic";

export default function Home() {
  return (
    <section>
      {/* banner */}

      {/*Features of Synchor */}
      <SynchroFeatures/>
      {/* How synchro works */}
      <SynchroWorks/>
      {/* PopularTopic */}
      <PopularTopic/>
    </section>
  );
}
