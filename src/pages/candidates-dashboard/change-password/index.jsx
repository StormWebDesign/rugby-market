
import ChangePassword from "@/components/dashboard-pages/candidates-dashboard/change-password";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Change Password || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const ChangePasswordPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordPage
