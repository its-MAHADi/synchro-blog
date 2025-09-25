
import SynchroFeatures from "./components/FeaturesOfSynchor/SynchroFeatures";
import SynchroWorks from "./components/HowSynchroWorks/SynchroWorks";
import Banner from "./components/Banner/Banner";
import Contact from "./components/Contact/Contact";
import FAQ from "./components/FAQ/FAQ";
import PopularTopic from "./components/popularTopic/PopularTopic";
import RecentPosts from "./components/RecentPosts/RecentPosts";
import SignupCoverProfile from "./components/signupCoverProfile/SignupCoverProfile";

export const metadata = {
  title: "Home | Synchro",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};

export default function Home() {
  return (
    <section className="max-w-11/12 mx-auto">
      {/* banner */}
      <Banner/>

      {/* Recent Post */}
      <RecentPosts/>

      {/*Features of Synchro */}
      <SynchroFeatures/>

      {/* How synchro works */}
      <SynchroWorks/>

      {/* PopularTopic */}
      <PopularTopic/>

      {/* FAQ section */}
      <FAQ></FAQ>
      
      {/* contact page */}
      <Contact/>

    </section>
  );
}
