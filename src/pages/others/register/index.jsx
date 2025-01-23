

import RegisterForm from "@/components/pages-menu/register";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Register || Rugby Transfer Market',
  description:
    'Rugby Transfer Market',
  
}



const RegisterPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <RegisterForm />
    </>
  );
};

export default RegisterPage
