import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
import config from "@/config";


export const metadata: Metadata = {
  title: "Shop | NextCommerce Nextjs E-commerce",
  description: "This is Shop Page for NextCommerce",
  // other metadata
};

async function fetchProducts() {
  try {
    const res = await fetch(`${config.API}product`); // Use "no-store" for server-side fetching
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await res.json();
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ShopWithSidebarPage = async () => {
  const products = await fetchProducts();
  return (
    <main>
      <ShopWithSidebar products={ products } />
    </main>
  );
};

export default ShopWithSidebarPage;
