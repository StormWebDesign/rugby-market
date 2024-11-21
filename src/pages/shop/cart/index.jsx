
import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const CartPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Cart />
    </>
  );
};

export default CartPage
