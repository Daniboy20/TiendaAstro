import React from "react";

interface AddToCartProps {
  stylesClass: string;
  handle: string | null;
}

export function AddToCart({
  stylesClass,
  handle,
}: AddToCartProps) {
  return (
    <a
      href={handle ? `/products/${handle}` : "#"}
      className={stylesClass}
    >
      Ver Producto
    </a>
  );
}