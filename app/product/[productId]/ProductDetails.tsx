"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { ToastCustom } from "@/utils/ToastMessage";
import { formatPrice } from "@/utils/formatPrice";
import { AddCircleOutline } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle, MdAddShoppingCart, MdVisibility } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectImgType;
  quantity: number;
  price: number;
};

export type selectImgType = {
  id: number;
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30% my-2]" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: {
      ...product.images[0],
    },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

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

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity >= 99) {
      ToastCustom(
        "error",
        "The Product limit quantity can't be exceeded!",
        "Message Error",
        "top-center"
      );
      return;
    } else {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity + 1 };
      });
    }
  }, [cartProduct]);
  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) {
      ToastCustom(
        "error",
        "The Product limit quantity can't be zero!",
        "Message Error",
        "top-center"
      );
      return;
    } else {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity - 1 };
      });
    }
  }, [cartProduct]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelected = useCallback((value: selectImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);
  return (
    <div
      className="grid grid-cols-1
  md:grid-cols-2 gap-12"
    >
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelected}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-400">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} Reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">PRICE: </span>
          {formatPrice(product.price)}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div
          className={
            product.inStock
              ? "text-teal-400 font-bold"
              : "text-rose-400 font-bold"
          }
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal></Horizontal>
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product Added to cart</span>
            </p>
            <Horizontal></Horizontal>
            <div className="max-w-[300px] m-2 font-semibold">
              <Button
                label="View cart"
                outline
                icon={MdVisibility}
                onClick={() => {
                  router.push("/cart");
                }}
              ></Button>
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelected}
            />
            <Horizontal></Horizontal>
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />
            <Horizontal></Horizontal>
            <div className="max-w-[300px] m-2 font-semibold">
              <Button
                outline
                label="Add to Cart"
                icon={MdAddShoppingCart}
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                }}
              />
            </div>
          </>
        )}{" "}
        <Link
          href={"/"}
          className="text-slate-400 flex items-center mt-3 font-bold hover:text-rose-500"
        >
          <AddCircleOutline />
          <span>Continue Shooping</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
