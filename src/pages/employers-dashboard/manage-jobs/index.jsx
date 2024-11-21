
import ManageJobs from "@/components/dashboard-pages/employers-dashboard/manage-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Manage Jobs || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const ManageJobsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ManageJobs />
    </>
  );
};

export default ManageJobsEmploeeDBPage
