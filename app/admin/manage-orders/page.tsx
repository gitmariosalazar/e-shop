import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/GetCurrentUser";
import NullData from "@/app/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/GetOrders";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Oops! Acces denied!!" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;

export const dynamic = "force-dynamic";
