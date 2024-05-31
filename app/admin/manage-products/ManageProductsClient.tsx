"use client";

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import firebaseApp from "@/libs/firebase";
import { ToastCustom } from "@/utils/ToastMessage";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import { toast } from "react-toastify";

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

  const router = useRouter();
  const storage = getStorage(firebaseApp);

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
      width: 120,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            {params.row.inStock == true ? (
              <Status
                text="In Stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Out of Stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className="flex justify-between gap-4 w-full"
            title="Change state"
          >
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then((res) => {
          ToastCustom(
            "success",
            "Product status success changed",
            "Message Info",
            "top-right"
          );
          router.refresh();
        })
        .catch((err) => {
          ToastCustom(
            "error",
            "Oops! Something wen wrong!",
            "Message Info",
            "top-right"
          );
          console.log(err);
        });
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast("Deleting product. please wait!");
      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
              //console.log("Delete images: ", item.image);
            }
          }
        } catch (error) {
          return console.log("Deleting images error!", error);
        }
      };
      await handleImageDelete();

      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          ToastCustom(
            "success",
            "Product deleted successfully!",
            "Message Info",
            "top-right"
          );
          router.refresh();
        })
        .catch((err) => {
          ToastCustom(
            "error",
            "Failed to delete product!",
            "Message Error",
            "top-right"
          );
        });
    },
    [storage, router]
  );

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-0">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
