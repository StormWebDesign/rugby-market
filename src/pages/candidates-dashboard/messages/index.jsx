
import Messages from "@/components/dashboard-pages/candidates-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const MessageesPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Messages />
    </>
  );
};

export default MessageesPage
