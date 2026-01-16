import Footer from "../components/footer";
import { getSiteHeaders } from "../sanity/lib/queries";
import PlaceholderSection from "./components/PlaceholderSection";
import UsVThemSection from "./components/UsVThemSection";

const RoozLanding = async () => {
  // Fetch all data server-side
  const [siteHeaders] = await Promise.all([getSiteHeaders()]);

  return (
    <div className="relative bg-black text-white overflow-clip w-full">
      <PlaceholderSection />
      <UsVThemSection />

      <Footer siteHeaders={siteHeaders} />
    </div>
  );
};

export default RoozLanding;
