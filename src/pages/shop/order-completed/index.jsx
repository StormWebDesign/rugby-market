
import OrderCompleted from "@/components/shop/order-completed";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Order Completed || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const OrderCompletedPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <OrderCompleted />
    </>
  );
};

export default OrderCompletedPage
