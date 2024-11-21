
import Checkout from "@/components/shop/checkout";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Checkout || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const CheckoutPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Checkout />
    </>
  );
};

export default CheckoutPage
