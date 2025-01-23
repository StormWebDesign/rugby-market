import ShopDetails from "@/components/shop/shop-single/ShopDetails";

import {useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop-details || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};

const ShopSingleDyanmic = () => {
  let params = useParams();
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShopDetails id={params.id} />
    </>
  );
};

export default ShopSingleDyanmic