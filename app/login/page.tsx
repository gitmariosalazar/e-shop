import { getCurrentUser } from "@/actions/GetCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Login;

export const dynamic = "force-dynamic";
