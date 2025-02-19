
import MyRugbyCareer from "@/components/dashboard-pages/candidates-dashboard/my-rugby-career";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Rugby Career || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const MyRugbyCareerPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyRugbyCareer />
    </>
  );
};

export default MyRugbyCareerPage
