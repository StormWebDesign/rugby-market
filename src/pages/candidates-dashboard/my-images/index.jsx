
import MyImages from "@/components/dashboard-pages/candidates-dashboard/my-images";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Rugby Images || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const MyImagesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyImages />
    </>
  );
};

export default MyImagesPage
