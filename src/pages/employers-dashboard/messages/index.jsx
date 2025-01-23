
import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || Rugby Transfer Market",
  description: "Rugby Transfer Market",
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
