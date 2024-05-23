"use client";

import {
  CartProductType,
  selectImgType,
} from "@/app/product/[productId]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { AddShoppingCart, Visibility } from "@mui/icons-material";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: selectImgType) => void;
}

const ProductImageCart: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id == product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const router = useRouter();
  return (
    <div
      className="flex flex-col border-[2.5px]
    border-slate-200
    bg-slate-800
    rounded-sm
    transition
    hover:scale-105
    text-center
    text-sm hover:bg-slate-700 hover:border-violet-800
  grid-cols-6
  h-full
    "
    >
      <div className="bg-slate-600">
        <div className="flex p-2">
          <div
            className="flex
          flex-row
          items-center
          justify-center w-full 
    "
          >
            {product.images.map((image: selectImgType) => {
              return (
                <div
                  key={image.color}
                  onClick={() => handleColorSelect(image)}
                  className={`relative aspect-square rounded border-teal-300 w-[30px] h-[30px] cursor-pointer
              ${
                cartProduct.selectedImg.color == image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
                >
                  <Image
                    src={image.image}
                    alt={image.color}
                    fill
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center w-[30px]">
            {isProductInCart ? (
              <>
                <div
                  className="cursor-pointer hover:text-red-500"
                  title="View cart"
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  <Visibility />
                </div>
              </>
            ) : (
              <>
                <div
                  className="cursor-pointer hover:text-red-500"
                  title="Add product to cart"
                  onClick={() => {
                    handleAddProductToCart(cartProduct);
                  }}
                >
                  <AddShoppingCart />
                </div>
              </>
            )}{" "}
          </div>
        </div>
      </div>

      <div
        className="box-cart cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <div
          className="col-span-5 relative
      aspect-square border-none w-full"
        >
          <Image
            fill
            src={cartProduct.selectedImg.image}
            alt={cartProduct.name}
            className="w-full
              object-contain
              items-center"
          />
        </div>
        <div
          className="flex
      flex-col
      items-center
      w-full
      gap-1"
        >
          <div className="aspect-square overflow-hidden relative"></div>
          <div className="mt-4">{truncateText(product.name)}</div>
          <div>
            <Rating value={productRating} readOnly />
          </div>
          <div>{product.reviews.length} Reviews</div>
          <div className="font-semibold p-2">{formatPrice(product.price)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageCart;
