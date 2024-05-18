"use client";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3x1">
        <ShoppingCart />
      </div>
      <span className="absolute top-[-13px] right-[-13px] bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
