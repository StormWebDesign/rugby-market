

import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'About || Superio - Job Borad ReactJs Template',
  description:
    'Superio - Job Borad ReactJs Template',
  
}



const AboutPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <About />
    </>
  );
};

export default AboutPage
