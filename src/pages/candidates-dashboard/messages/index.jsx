
import Messages from "@/components/dashboard-pages/candidates-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || Rugby Transfer Market",
  description: "Rugby Transfer Market",
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
