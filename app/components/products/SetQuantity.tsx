"use client";

import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import "../../../css/btn_styles.css";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const btnstyles = "ounded items-center btn-more";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div
      className="flex
    gap-8
    items-center"
    >
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnstyles} onClick={handleQuantityDecrease}>
          <RemoveCircle />
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnstyles} onClick={handleQuantityIncrease}>
          <AddCircle />
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
