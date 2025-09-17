
import SynchroFeatures from "./components/FeaturesOfSynchor/SynchroFeatures";
import SynchroWorks from "./components/HowSynchroWorks/SynchroWorks";
import Banner from "./components/Banner/Banner";
import Contact from "./components/Contact/Contact";
import PopularTopic from "./components/popularTopic/PopularTopic";
import RecentPosts from "./components/RecentPosts/RecentPosts";

export default function Home() {
  return (
    <section className="max-w-11/12 mx-auto space-y-20">
      {/* banner */}
        <Banner/>
        {/* Recent Post */}
        <RecentPosts/>
      {/*Features of Synchor */}
      <SynchroFeatures/>
      {/* How synchro works */}
      <SynchroWorks/>

      {/* PopularTopic */}
      <PopularTopic/>
      
      {/* contact page */}
      <Contact/>
    </section>
  );
}
