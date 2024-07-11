import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/GetCurrentUser";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/actions/GetOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Acces denied!!" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="Oops! No orders yet!" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
