
import JobList from "@/components/job-listing-pages/job-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V1 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobListPage1 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage1
