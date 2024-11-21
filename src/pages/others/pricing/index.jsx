

import Pricing from "@/components/pages-menu/pricing";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Pricing || Superio - Job Borad ReactJs Template',
  description:
    'Superio - Job Borad ReactJs Template',
  
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
