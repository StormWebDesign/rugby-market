import React from "react";

import Home from "@/components/home-9";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-9 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const HomePage9 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage9;
