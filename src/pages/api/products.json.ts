import type { APIRoute } from "astro";

const demoProducts = [
  {
    id: "1",
    title: "Producto Demo 1",
    handle: "producto-demo-1",
    description: "Producto de ejemplo para la plantilla.",
    availableForSale: true,
    featuredImage: {
      url: "/images/product-placeholder.jpg",
      altText: "Producto Demo 1",
    },
    variants: [{ id: "variant-1" }],
    priceRange: {
      minVariantPrice: {
        amount: "25.00",
        currencyCode: "USD",
      },
    },
    compareAtPriceRange: {
      maxVariantPrice: {
        amount: "35.00",
        currencyCode: "USD",
      },
    },
  },
];

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      products: demoProducts,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};