
import JobList from "@/components/job-listing-pages/job-list-v4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V4 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobListPage4 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage4
