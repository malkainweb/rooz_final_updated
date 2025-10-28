import TestimonialsSection from "./components/testimonial";
import Nav from "./components/Nav";
import HowItWorksSection from "./components/HowItWorksSection";
import HomeUspAnimation from "./components/HomeUspAnimation";
import LockDistractionsSection from "./components/LockDistractionsSection";
import Hero from "./components/Hero";
import Footer from "./components/footer";
import {
  getSiteHeaders,
  getStatCards,
  getTestimonials,
  getHowItWorksSteps,
  getWhyChooseUsCards, // ✅ Add this
} from "./sanity/lib/queries";

export const revalidate = 60;

const RoozLanding = async () => {
  // Fetch all data server-side
  const [
    testimonials,
    siteHeaders,
    statCards,
    howItWorksSteps,
    whyChooseUsCards,
  ] = await Promise.all([
    getTestimonials(),
    getSiteHeaders(),
    getStatCards(),
    getHowItWorksSteps(),
    getWhyChooseUsCards(), // ✅ Add this
  ]);

  return (
    <div className="relative bg-black text-white overflow-clip w-full">
      <Nav />
      <Hero siteHeaders={siteHeaders} />
      <div className="h-[10rem]" />
      <HomeUspAnimation
        siteHeaders={siteHeaders}
        cards={whyChooseUsCards} // ✅ Add this prop
      />
      <LockDistractionsSection
        statCards={statCards}
        siteHeaders={siteHeaders}
      />
      <HowItWorksSection siteHeaders={siteHeaders} steps={howItWorksSteps} />
      <TestimonialsSection
        testimonials={testimonials}
        siteHeaders={siteHeaders}
      />
      <Footer siteHeaders={siteHeaders} />
    </div>
  );
};

export default RoozLanding;
