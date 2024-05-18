import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/GetCurrentUser";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div
      className="
  sticky
  top-0
  w-full
  bg-slate-900
  z-30
  shadow-sm"
    >
      <div className="py-4 border-b-0">
        <Container>
          <div
            className="
          flex
          items-center
          justify-between
          gap-3
          md-gap-0"
          >
            <Link href="/" className={`${redressed.className}`}>
              E-Shop Mario Salazar
            </Link>
            <div className="hidden md:block">Search</div>
            <div
              className="
            flex
            items-center
            gap-8 md:gap-12"
            >
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
