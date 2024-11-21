
import OrderCompleted from "@/components/shop/order-completed";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Order Completed || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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
