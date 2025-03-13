import EditJob from "@/components/dashboard-pages/employers-dashboard/edit-job";
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";

const metadata = {
  title: "Edit Job || Rugby Transfer Market",
  description: "Edit your job posting on the Rugby Transfer Market",
};

const EditJobPage = () => {
  const { jobId } = useParams(); // Get job ID from the URL

  return (
    <>
      <MetaComponent meta={metadata} />
      <EditJob jobId={jobId} />
    </>
  );
};

export default EditJobPage;
