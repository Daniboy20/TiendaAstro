
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag } from "react-icons/fa";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  url?: string;
  size?: string;
  color?: string;
  quantity: number;
};

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    loadCart();

    window.addEventListener("open-cart", () => setIsOpen(true));
    window.addEventListener("cart-updated", loadCart);

    return () => {
      window.removeEventListener("open-cart", () => setIsOpen(true));
      window.removeEventListener("cart-updated", loadCart);
    };
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const increaseQuantity = (id: string, size?: string) => {
  const newCart = cart.map((item) =>
    item.id === id && item.size === size
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  saveCart(newCart);
};

  const decreaseQuantity = (id: string, size?: string) => {
  const newCart = cart.map((item) =>
    item.id === id && item.size === size
      ? { ...item, quantity: Math.max(1, item.quantity - 1) }
      : item
  );
  saveCart(newCart);
};

  const removeItem = (id: string, size?: string) => {
  const newCart = cart.filter(
    (item) => !(item.id === id && item.size === size)
  );
  saveCart(newCart);
};

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
          <button
        onClick={() => setIsOpen(true)}
        className="relative mr-4 rounded-full p-2 transition hover:bg-white/10"
        aria-label="Abrir carrito"
      >
        <FaShoppingBag size={22} />

        {cart.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>
    
      {isOpen && (
          <div className="fixed inset-0 z-[9999]">
            <div
              className="fixed inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <aside className="fixed right-0 top-0 z-[10000] flex h-screen w-full max-w-[420px] flex-col border-l border-gray-200 bg-white text-gray-950 shadow-2xl dark:border-white/10 dark:bg-[#151515] dark:text-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5 dark:border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                    Tu carrito
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cart.reduce((total, item) => total + item.quantity, 0)} producto(s)
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-5 dark:bg-white/10">
                      <FaShoppingBag size={40} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                      Tu carrito está vacío
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Agrega productos para verlos aquí.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-4 rounded-2xl bg-gray-100 p-3 dark:bg-white/5"
                      >
                        <img
                          src={item.image || "/images/product-placeholder.jpg"}
                          alt={item.title}
                          className="h-24 w-20 shrink-0 rounded-xl object-cover"
                        />

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate text-base font-bold text-gray-950 dark:text-white">
                                {item.title}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {item.size && `Talla: ${item.size}`}
                                {item.color && ` · Color: ${item.color}`}
                              </p>

                              {item.url && (
                                <a
                                  href={item.url}
                                  className="mt-2 inline-block text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                  Ver artículo
                                </a>
                              )}
                            </div>

                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="shrink-0 text-gray-400 hover:text-red-500"
                            >
                              <FaTrash size={15} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-gray-300 bg-white dark:border-white/10 dark:bg-transparent">
                              <button
                                onClick={() => decreaseQuantity(item.id, item.size)}
                                className="px-2 py-1 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                              >
                                <FaMinus size={12} />
                              </button>

                              <span className="px-2 text-sm text-gray-950 dark:text-white">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => increaseQuantity(item.id, item.size)}
                                className="px-2 py-1 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              L. {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 px-4 py-4 dark:border-white/10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-gray-950 dark:text-white">
                    L. {subtotal.toFixed(2)}
                  </span>
                </div>

                <button className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700">
                  Finalizar compra
                </button>

                <a
                  href="/productos"
                  className="mt-3 block w-full rounded-xl border border-gray-300 py-3 text-center text-sm font-bold text-gray-900 hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                >
                  Seguir comprando
                </a>
              </div>
            </aside>
          </div>
        )}
    </>
  );
}