import React from "react";

import Home from "@/components/home-2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-2 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const HomePage2 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage2;
