"use client";

import {
  CartProductType,
  selectImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

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
  return (
    <div
      className="grid
  grid-cols-6
  gap-2
  h-full
  max-h-[500px]
  min-h-[300px]
  sm:min-h-[400px]
    "
    >
      <div
        className="flex
          flex-row
          items-center
          justify-center
          cursor-pointer
          h-[25px] bg-slate-100 w-full
    "
      >
        {product.images.map((image: selectImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-[100%] aspect-square rounded border-teal-300
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
      <div
        className="col-span-5 relative
      aspect-square border-none w-full h-full"
      >
        <Image
          fill
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          className="w-full
              h-full
              object-contain
              max-h-[500px]
              min-h-[300px]
              sm:min-h-[400px]
              items-center"
        />
      </div>
    </div>
  );
};

export default ProductImageCart;
