import Wrapper from "@/layout/Wrapper";
import HomeComponent from "@/components/home-1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "The Rugby Transfer Market",
  description: "We need a good description here",
};

export default function Home() {
  return (
    <Wrapper>
    <MetaComponent meta={metadata} />
      <HomeComponent />
    </Wrapper>
  );
}
