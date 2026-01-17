
import MyResume from "@/components/dashboard-pages/candidates-dashboard/my-resume/index.jsx";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Work & Education || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const MyResumePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyResume />
    </>
  );
};

export default MyResumePage
