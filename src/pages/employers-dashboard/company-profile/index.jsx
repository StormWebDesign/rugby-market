
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <CompanyProfile />
    </>
  );
};

export default CompanyProfileEmploeeDBPage
