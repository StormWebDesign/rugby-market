
import EmployersList from "@/components/employers-listing-pages/employers-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V1 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const EmployerListPage1 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage1
