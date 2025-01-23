

import Pricing from "@/components/pages-menu/pricing";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Pricing || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
}



const PricingPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Pricing />
    </>
  );
};

export default PricingPage
