
import JobList from "@/components/job-listing-pages/job-list-v5";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V5 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const JobListPage5 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage5
