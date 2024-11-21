
import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const ShopListPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShopList />
    </>
  );
};

export default ShopListPage
