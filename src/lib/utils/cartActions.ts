export async function addItem(selectedVariantId: string | undefined) {
  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  return "Producto agregado visualmente";
}

export async function removeItem(lineId: string) {
  if (!lineId) {
    return "Missing line ID";
  }

  return "Producto removido visualmente";
}

export async function updateItemQuantity(payload: {
  lineId: string;
  variantId: string;
  quantity: number;
}) {
  if (!payload.lineId || !payload.variantId) {
    return "Missing item data";
  }

  return "Cantidad actualizada visualmente";
}