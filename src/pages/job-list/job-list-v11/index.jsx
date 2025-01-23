
import JobList from "@/components/job-listing-pages/job-list-v11";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V11 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobListPage11 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage11
