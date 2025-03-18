
import JobList from "@/components/job-listing-pages/job-list-v1";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Playing Job Listings | Transfer Market",
  description: "Job listings from the Transfer Market. Find your next playing job on the Transfer Market",
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
