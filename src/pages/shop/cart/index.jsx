
import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || Rugby Transfer Market",
  description: "Rugby Transfer Market",
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
