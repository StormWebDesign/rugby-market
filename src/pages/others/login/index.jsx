

import LogIn from "@/components/pages-menu/login";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Login | Rugby Transfer Market',
  description:
    'Login to your Rugby Transfer Market account',
  
}



const LoginPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <LogIn />
    </>
  );
};

export default LoginPage
