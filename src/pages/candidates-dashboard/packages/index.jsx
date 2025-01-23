
import Packages from "@/components/dashboard-pages/candidates-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const PackagePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackagePage
