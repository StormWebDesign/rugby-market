

import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Contact || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
}



const ContactPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <Contact />
    </>
  );
};

export default ContactPage
