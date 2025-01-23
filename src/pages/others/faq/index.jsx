

import Faq from "@/components/pages-menu/faq";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Faq || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
}



const FaqPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Faq />
    </>
  );
};

export default FaqPage
