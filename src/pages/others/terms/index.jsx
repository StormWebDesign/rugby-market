

import Terms from "@/components/pages-menu/terms";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Terms || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
}



const TermsPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Terms />
    </>
  );
};

export default TermsPage
