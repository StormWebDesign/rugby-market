
import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const MessageEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Messages />
    </>
  );
};

export default MessageEmploeeDBPage
