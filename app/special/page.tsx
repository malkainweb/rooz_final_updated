import Footer from "../components/footer";
import { getSiteHeaders } from "../sanity/lib/queries";
import BookDemoSection from "./components/BookDemoSection";
import EventsTable from "./components/EventsTable";
import PlaceholderSection from "./components/PlaceholderSection";
import SpecialNav from "./components/SpecailNav";
import UsVThemSection from "./components/UsVThemSection";
import VideoScrollSection from "./components/VideoScrollSection";

const RoozLanding = async () => {
  // Fetch all data server-side
  const [siteHeaders] = await Promise.all([getSiteHeaders()]);

  return (
    <div className="relative bg-black text-white overflow-clip w-full">
      <SpecialNav />
      <VideoScrollSection />
      {/* <PlaceholderSection /> */}
      {/* <EventsTable /> */}
      {/* <BookDemoSection /> */}
      <UsVThemSection />

      <Footer siteHeaders={siteHeaders} />
    </div>
  );
};

export default RoozLanding;
