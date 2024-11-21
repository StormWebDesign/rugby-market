

import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Invoice || Superio - Job Borad ReactJs Template',
  description:
    'Superio - Job Borad ReactJs Template',
  
}



const InvoicePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Invoice />
    </>
  );
};

export default InvoicePage
