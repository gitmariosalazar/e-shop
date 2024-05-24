"use client";

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { ToastCustom } from "@/utils/ToastMessage";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

interface OrdersClientProps {
  orders: ExtendedOrder[] | undefined;
}

type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 130,
      renderCell: (params) => {
        return <div className="font-bold text-slate-200">{params.row.id}</div>;
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">{params.row.customer}</div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount(USD)",
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-200">{params.row.amount}</div>
        );
      },
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            {params.row.paymentStatus == "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus == "complete" ? (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            {params.row.deliveryStatus == "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus == "dispatched" ? (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus == "delivered" ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="text-slate-200">
            {moment(params.row.createdAt).fromNow()}
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
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-0">
        <Heading title="Manage Orders" center />
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

export default OrdersClient;
