import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/GetOrderById";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);
  if (!order) {
    return;
  }
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;

export const dynamic = "force-dynamic";
