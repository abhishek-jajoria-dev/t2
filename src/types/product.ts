// export type Product = {
//   title: string;
//   reviews: number;
//   price: number;
//   discountedPrice: number;
//   id: number;
//   imgs?: {
//     thumbnails: string[];
//     previews: string[];
//   };
// };
export type Product = {
  id: number
  name: string;
  slug: string; // Base slug for the product
  description?: string;
  images: string[];
  collections: string[];
  color: string;
  size: string;
  price: number;
  mrp: number;
  stock: number;
  review: number;
  rating: number;
  gst: number;
  hsn?: string;
  sku?: string;
  order_by: number;
  status: string;
}
