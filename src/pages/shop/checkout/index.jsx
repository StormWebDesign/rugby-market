
import Checkout from "@/components/shop/checkout";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Checkout || Rugby Transfer Market",
  description: "Rugby Transfer Market",
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
