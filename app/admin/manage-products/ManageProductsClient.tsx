"use client";

import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import React from "react";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
      renderCell: (params) => {
        return <div className="font-bold text-slate-200">{params.row.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">{params.row.name}</div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price(USD)",
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">
            {formatPrice(params.row.price)}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "category",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">{params.row.category}</div>
        );
      },
    },
    {
      field: "brand",
      headerName: "brand",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">{params.row.brand}</div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "inStock",
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">
            {params.row.inStock == true ? "In Stoc" : "Out of Stock"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => {
        return <div className="font-bold text-slate-200">Actions</div>;
      },
    },
  ];

  return (
    <div>
      <DataGrid
        className="table-fixed"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default ManageProductsClient;
