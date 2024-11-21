
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const PostJobsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <PostJob />
    </>
  );
};

export default PostJobsEmploeeDBPage
