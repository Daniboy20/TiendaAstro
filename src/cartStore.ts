import { atom, computed } from "nanostores";
import {
  addItem,
  removeItem,
  updateItemQuantity,
} from "@/lib/utils/cartActions";

type Cart = {
  totalQuantity: number;
};

export const cart = atom<Cart | null>({
  totalQuantity: 0,
});

export const totalQuantity = computed(cart, (c) =>
  c ? c.totalQuantity : 0
);

export const layoutView = atom<"card" | "list">("card");

export function setLayoutView(view: "card" | "list") {
  layoutView.set(view);
}

export function getLayoutView() {
  return layoutView.get();
}

export async function refreshCartState() {
  cart.set({
    totalQuantity: cart.get()?.totalQuantity || 0,
  });
}

export async function addItemToCart(selectedVariantId: string) {
  await addItem(selectedVariantId);

  const currentQuantity = cart.get()?.totalQuantity || 0;

  cart.set({
    totalQuantity: currentQuantity + 1,
  });

  return "Added to cart";
}

export async function removeItemFromCart(lineId: string) {
  await removeItem(lineId);

  const currentQuantity = cart.get()?.totalQuantity || 0;

  cart.set({
    totalQuantity: Math.max(currentQuantity - 1, 0),
  });

  return "Removed from cart";
}

export async function updateCartItemQuantity(payload: {
  lineId: string;
  variantId: string;
  quantity: number;
}) {
  await updateItemQuantity(payload);

  cart.set({
    totalQuantity: payload.quantity,
  });

  return "Cart updated";
}