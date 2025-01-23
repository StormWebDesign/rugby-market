

import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'About || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
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
