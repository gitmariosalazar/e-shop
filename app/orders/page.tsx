import getProducts from "@/actions/GetProducts";
import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/GetCurrentUser";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrderClient";
import getOrders from "@/actions/GetOrders";
import getOrdersByUserId from "@/actions/GetOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Oops! Acces denied!!" />;
  }

  const orders = await getOrdersByUserId(currentUser?.id);

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
