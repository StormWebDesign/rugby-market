
import JobList from "@/components/job-listing-pages/job-list-v10";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V10 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobListPage10 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage10
