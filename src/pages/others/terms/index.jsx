

import Terms from "@/components/pages-menu/terms";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Terms || Superio - Job Borad ReactJs Template',
  description:
    'Superio - Job Borad ReactJs Template',
  
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
