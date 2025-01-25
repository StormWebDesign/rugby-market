

import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Contact || Rugby Transfer Market',
  description:
    'Need to get in contact with us at Rugby Transfer Market? Use the form below',
  
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
