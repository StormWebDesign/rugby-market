
import Packages from "@/components/dashboard-pages/candidates-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
