
import JobList from "@/components/job-listing-pages/job-list-v12";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V12 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobListPage12 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage12
