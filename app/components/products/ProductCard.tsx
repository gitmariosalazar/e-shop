"use client";

import {
  CartProductType,
  selectImgType,
} from "@/app/product/[productId]/ProductDetails";
import { useCallback, useState } from "react";
import ProductImageCart from "./ProductImageCart";

interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.name,
    description: data.description,
    category: data.category,
    brand: data.brand,
    selectedImg: {
      ...data.images[0],
    },
    quantity: 1,
    price: data.price,
  });

  const handleColorSelected = useCallback((value: selectImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  return (
    <div>
      <div>
        <ProductImageCart
          cartProduct={cartProduct}
          product={data}
          handleColorSelect={handleColorSelected}
        />
      </div>
    </div>
  );
};

export default ProductCard;
