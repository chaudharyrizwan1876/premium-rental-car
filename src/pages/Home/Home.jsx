import Hero from "../../components/home/Hero";
import FeaturedCars from "../../components/home/FeaturedCars";
import Categories from "../../components/home/Categories";
import WeddingCollection from "../../components/home/WeddingCollection";
import LuxuryBrands from "../../components/home/LuxuryBrands";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import PremiumServices from "../../components/home/PremiumServices";
import Testimonials from "../../components/home/Testimonials";
import CallToAction from "../../components/home/CallToAction";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <Categories />
      <WeddingCollection />
      <LuxuryBrands />
      <WhyChooseUs />
      <PremiumServices />
      <Testimonials />
      <CallToAction />
    </>
  );
}

export default Home;
