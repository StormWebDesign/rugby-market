import React from "react";

import Home from "@/components/home-4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-4 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const HomePage4 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage4;
