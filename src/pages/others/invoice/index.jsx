

import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Invoice || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
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
