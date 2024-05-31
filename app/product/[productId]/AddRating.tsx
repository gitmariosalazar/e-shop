"use client";
import Heading from "@/app/components/Heading";
import { SafeUser } from "@/types";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "@/css/rating.css";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { Rating } from "@mui/material";
import { ToastCustom } from "@/utils/ToastMessage";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating == 0) {
      setIsLoading(false);
      return ToastCustom(
        "error",
        "No rating selected",
        "Message Error",
        "top-right"
      );
    }
    const ratingData = { ...data, userId: user?.id, product: product };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        ToastCustom(
          "success",
          "Rating submited!",
          "Message Success",
          "top-right"
        );
        router.refresh();
        reset();
      })
      .catch((error) => {
        ToastCustom(
          "error",
          "Something went wrong!",
          "Message Error",
          "top-rght"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) {
    return null;
  }

  const deliveredOrder = user?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId == user.id;
  });

  /*
  if (userReview || !deliveredOrder) {
    return null;
  }
  */

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <div className="flex justify-center items-center w-[150px] h-[30px] bg-slate-500">
        <Rating
          onChange={(event, newValue) => {
            setCustomValue("rating", newValue);
          }}
          className="custom-rating"
        />
      </div>
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading" : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
