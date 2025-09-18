import Banner from "./components/Banner/Banner";
import Contact from "./components/Contact/Contact";
import FAQ from "./components/FAQ/FAQ";
import PopularTopic from "./components/popularTopic/PopularTopic";

export default function Home() {
  return (
    <section>
      {/* banner */}
        <Banner></Banner>
      {/*Features of Synchor */}

      {/* How synchro works */}
         
      {/* PopularTopic */}
      <PopularTopic/>

      {/* FAQ section */}
      <FAQ></FAQ>
      
      {/* contact page */}
      <Contact/>
    </section>
  );
}
