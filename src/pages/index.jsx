import Wrapper from "@/layout/Wrapper";
import HomeComponent from "@/components/home-7";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Rugby Transfer Market",
  description: "Find your next rugby club or player with Rugby Transfer Market",
};

export default function Home() {
  return (
    <Wrapper>
    <MetaComponent meta={metadata} />
      <HomeComponent />
    </Wrapper>
  );
}
