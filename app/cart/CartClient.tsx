"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdClear, MdLogin, MdPayment } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmout } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length == 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2x1">Your cart is empty!</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shooping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shooping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start text-blue-900 font-bold pl-3">
          PRODUCT
        </div>
        <div className="justify-self-center text-blue-900 font-bold">PRICE</div>
        <div className="justify-self-center text-blue-900 font-bold">
          QUANTITY
        </div>
        <div className="justify-self-end text-blue-900 font-bold pr-3">
          TOTAL
        </div>
      </div>
      <div>
        <div>
          {cartProducts &&
            cartProducts.map((item) => {
              return <ItemContent key={item.id} item={item} />;
            })}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
          <div className="w-[120px]">
            <Button
              label="Clear Cart"
              icon={MdClear}
              onClick={() => {
                handleClearCart();
              }}
              small
            />
          </div>
          <div className="text-sm flex flex-col gap-1 items-start">
            <div className="flex justify-between w-full text-base font-semibold pr-3">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotalAmout)}</span>
            </div>
            <p className="text-slate-500">
              Taxes and shipping calculate at checkout!
            </p>
            <Button
              icon={currentUser ? MdPayment : MdLogin}
              label={currentUser ? "Checkout" : "Login to Checkout"}
              onClick={() => {
                currentUser ? router.push("/checkout") : router.push("/login");
              }}
            />
            <Link
              href={"/"}
              className="text-slate-500 flex items-center gap-1 mt-2 font-semibold hover:text-rose-500"
            >
              <MdArrowBack />
              <span>Continue Shooping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
