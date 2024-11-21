
import JobAlerts from "@/components/dashboard-pages/candidates-dashboard/job-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Job Alerts || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const JobAlertPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <JobAlerts />
    </>
  );
};

export default JobAlertPage
