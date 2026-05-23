export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  availableForSale: boolean;
  tags: string[];
  material: string;
  colors: string[];
  sizes: string[];
  featuredImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  images: {
    url: string;
    altText: string;
    width: number;
    height: number;
  }[];
  options: any[];
  variants: any[];
  collections: {
    nodes: { title: string }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};


//AGREGAR MAS PRODUCTOS AQUÍ

export const products: Product[] = [
  {
    id: "1",
    title: "Camisa Oversize Negra",
    handle: "camisa-oversize-negra",
    description: "Camisa oversize de algodón, ideal para un estilo casual.",
    descriptionHtml: "<p>Camisa oversize de algodón, ideal para un estilo casual.</p>",
    vendor: "Urban Wear",
    availableForSale: true,
    tags: ["hombre", "nuevo", "camisas"],
    material: "100% algodón",
    colors: ["Negro", "Blanco", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    featuredImage: {
      url: "/images/products/camisa-oversize-negra.jpg",
      altText: "Camisa oversize negra",
      width: 507,
      height: 385,
    },
    images: [
      {
        url: "/images/products/camisa-oversize-negra.jpg",
        altText: "Camisa oversize negra",
        width: 507,
        height: 385,
      },
    ],
    options: [],
    variants: [
      {
        id: "variant-1",
        availableForSale: true,
        selectedOptions: [],
      },
    ],
    collections: {
      nodes: [{ title: "Hombre" }],
    },
    priceRange: {
      minVariantPrice: {
        amount: "25.00",
        currencyCode: "",
      },
    },
    compareAtPriceRange: {
      maxVariantPrice: {
        amount: "35.00",
        currencyCode: "",
      },
    },
  },

];