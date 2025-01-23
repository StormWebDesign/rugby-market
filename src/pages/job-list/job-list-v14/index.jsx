
import JobList from "@/components/job-listing-pages/job-list-v14";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V14 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const JobListPage14 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage14
