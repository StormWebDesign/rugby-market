
import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || Rugby Transfer Market",
  description: "Rugby Transfer Market",
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
