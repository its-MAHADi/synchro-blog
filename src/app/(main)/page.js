import SynchroFeatures from "./components/FeaturesOfSynchor/SynchroFeatures";
import SynchroWorks from "./components/HowSynchroWorks/SynchroWorks";
import Banner from "./components/Banner/Banner";
import Contact from "./components/Contact/Contact";
import FAQ from "./components/FAQ/FAQ";
import PopularTopic from "./components/popularTopic/PopularTopic";
import BlogPost from "./components/BlogPost/BlogPost";
import PostField from "./components/PostField/PostField";
import AllPosts from "./components/AllPosts/AllPosts";
import MessageBar from "./components/MessageBar/MessageBar";

import SynchroStatistic from "./components/SynchroStatistic/SynchroStatistic";
import TopArticles from "./components/TopArtricles/TopArticles";
import AllProfessions from "./components/AllProfessions/AllProfessions";
import JoinCommunity from "./components/JoinCommunity/JoinCommunity";
import Newsletter from "./components/Newsletter/Newsletter";

export const metadata = {
  title: "Home | Synchro",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};

export default function Home() {
  return (
    <section >
     <div className="space-y-10">
      <Banner/>

      <SynchroStatistic></SynchroStatistic>

      <SynchroFeatures/>

      <TopArticles></TopArticles>

      <AllProfessions></AllProfessions>

      <JoinCommunity></JoinCommunity>

      <Newsletter></Newsletter>      
      {/* <Contact/> */}
     </div>
    </section>
  );
}





