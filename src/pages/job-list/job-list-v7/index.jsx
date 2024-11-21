
import JobList from "@/components/job-listing-pages/job-list-v7";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List V7 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const JobListPage7 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage7
