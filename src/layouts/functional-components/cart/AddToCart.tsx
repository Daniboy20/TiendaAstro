import React, { useState } from "react";

interface AddToCartProps {
  stylesClass: string;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    url: string;
    size?: string;
    color?: string;
  };
}

export function AddToCart({ stylesClass, product }: AddToCartProps) {
  const [notification, setNotification] = useState("");

  const handleAddToCart = () => {
    const selectedSize =
      document.getElementById("talla-seleccionada")?.textContent?.trim() || "";

    const finalSize = selectedSize && selectedSize !== "—" ? selectedSize : "";

    const selectedColor =
  document.getElementById("color-seleccionado-label")?.textContent?.trim() || "";

const finalColor =
  selectedColor && selectedColor !== "—" ? selectedColor : product.color || "";

    if (!finalSize) {
      setNotification("Selecciona una talla antes de agregar al carrito");
      setTimeout(() => setNotification(""), 2500);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

   const existingItem = cart.find(
      (item: any) =>
        item.id === product.id &&
        item.size === finalSize &&
        item.color === finalColor
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        size: finalSize,
        color: finalColor,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    setNotification("Producto agregado al carrito");
    setTimeout(() => setNotification(""), 2500);
  };

  return (
    <>
      <button onClick={handleAddToCart} className={stylesClass}>
        Agregar al carrito
      </button>

      {notification && (
        <div className="fixed left-1/2 top-24 z-[9999] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#181818] px-6 py-4 text-center font-semibold text-white shadow-2xl">
          <span className="block text-sm text-blue-400">WearFit</span>
          {notification}
        </div>
      )}
    </>
  );
}