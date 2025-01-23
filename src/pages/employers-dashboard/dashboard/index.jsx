
import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employeers Dashboard || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const DashboardEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardEmploeeDBPage
