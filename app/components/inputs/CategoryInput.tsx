"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-md border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-300 hover:text-rose-400 transition cursor-pointer ${
        selected
          ? "border-slate-200 bg-slate-800 text-sky-500"
          : "border-slate-700"
      }`}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
