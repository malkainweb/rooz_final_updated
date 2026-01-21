import { getSiteHeaders } from "../sanity/lib/queries";
import BookDemoSection from "./components/BookDemoSection";

import SpecailFooter from "./components/SpecailFooter";
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
      <BookDemoSection />
      <UsVThemSection />

      <SpecailFooter siteHeaders={siteHeaders} />
    </div>
  );
};

export default RoozLanding;
