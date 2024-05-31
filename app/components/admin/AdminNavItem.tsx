import React from "react";
import { IconType } from "react-icons";

interface AdminNavItenProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavIten: React.FC<AdminNavItenProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-200 transition cursor-pointer ${
        selected
          ? "border-b-slate-300 text-slate-200"
          : "border-transparent text-slate-500"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default AdminNavIten;
