import {
  getActionCards,
  getBookDemoSection,
  getComparisonRows,
  getEvents,
  getFooterContent,
  getSiteHeaders,
  getVideoScrollContent,
} from "../sanity/lib/queries";
import BookDemoSection from "./components/BookDemoSection";
import EventsTable from "./components/EventsTable";

import SpecailFooter from "./components/SpecailFooter";
import SpecialNav from "./components/SpecailNav";
import UsVThemSection from "./components/UsVThemSection";
import VideoScrollSection from "./components/VideoScrollSection";

export const revalidate = 60;
const RoozLanding = async () => {
  // Fetch all data server-side
  const [
    siteHeaders,
    comparisonRows,
    events,
    actionCards,
    bookDemoSection,
    footerContent,
    videoScrollContent, // ✅ Add this
  ] = await Promise.all([
    getSiteHeaders(),
    getComparisonRows(),
    getEvents(),
    getActionCards(),
    getBookDemoSection(),
    getFooterContent(),
    getVideoScrollContent(), // ✅ Add this
  ]);

  return (
    <div className="relative bg-black text-white overflow-clip w-full">
      <SpecialNav />
      <VideoScrollSection
        events={events}
        actionCards={actionCards}
        bookDemoSection={bookDemoSection}
        videoScrollContent={videoScrollContent} // ✅ Pass it
      />
      {/* <PlaceholderSection /> */}
      {/* <EventsTable /> */}
      {/* <BookDemoSection /> */}
      <UsVThemSection comparisonRows={comparisonRows} />
      <SpecailFooter footerContent={footerContent} /> {/* ✅ Pass it */}
    </div>
  );
};

export default RoozLanding;
