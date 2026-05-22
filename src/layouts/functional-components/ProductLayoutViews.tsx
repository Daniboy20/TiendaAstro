import { layoutView } from "@/cartStore";
import { useStore } from "@nanostores/react";
import React from "react";
import SkeletonCards from "./loadings/skeleton/SkeletonCards";
import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";

const ProductLayoutViews = ({
  initialProducts,
  initialPageInfo,
  sortKey,
  reverse,
  searchValue,
}: {
  initialProducts: any[];
  initialPageInfo: any;
  sortKey: string;
  reverse: boolean;
  searchValue: string | null;
}) => {
  const layout = useStore(layoutView);

  return (
    <div className="col-12 lg:col-9">
      {layout === "list" ? (
        <ProductList
          initialProducts={initialProducts}
          initialPageInfo={initialPageInfo}
          sortKey={sortKey}
          reverse={reverse}
          searchValue={searchValue}
        />
      ) : (
        <ProductGrid
          initialProducts={initialProducts}
          initialPageInfo={initialPageInfo}
          sortKey={sortKey}
          reverse={reverse}
          searchValue={searchValue}
        />
      )}
    </div>
  );
};

export default ProductLayoutViews;