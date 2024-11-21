import React from "react";

import Home from "@/components/home-14";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-14 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const HomePage14 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage14;
