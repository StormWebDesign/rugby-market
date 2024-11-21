
import ChangePassword from "@/components/dashboard-pages/employers-dashboard/change-password";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Change Password || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const ChangePasswordEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordEmploeeDBPage
