

import RegisterForm from "@/components/pages-menu/register";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Register || Superio - Job Borad ReactJs Template',
  description:
    'Superio - Job Borad ReactJs Template',
  
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
