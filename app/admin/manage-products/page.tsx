import getProducts from "@/actions/GetProducts";
import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import { getCurrentUser } from "@/actions/GetCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Oops! Acces denied!!" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
