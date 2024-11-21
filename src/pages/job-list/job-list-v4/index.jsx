
import JobList from "@/components/job-listing-pages/job-list-v4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V4 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
