import React from "react";

import Home from "@/components/home-12";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-12 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const HomePage12 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage12;
