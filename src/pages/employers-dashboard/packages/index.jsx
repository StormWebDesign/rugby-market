
import Packages from "@/components/dashboard-pages/employers-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const PackageEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackageEmploeeDBPage
