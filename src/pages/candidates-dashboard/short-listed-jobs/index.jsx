
import ShortListedJobs from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Short Listed Jobs || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const ShortListedJobsPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShortListedJobs />
    </>
  );
};

export default ShortListedJobsPage
