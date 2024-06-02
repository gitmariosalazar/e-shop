import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
  return (
    <div>
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;

export const dynamic = "force-dynamic";
