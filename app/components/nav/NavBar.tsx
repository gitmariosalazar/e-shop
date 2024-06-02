import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/GetCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Image from "next/image";
import LogoMarioSalazar from "@/public/images/LogoMarioSalazar.gif";
import "@/css/homepage.css";

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
            <Link
              href="/"
              className={`${redressed.className} flex flex-row justify-between items-center hover:text-red-500`}
            >
              <Image
                src={LogoMarioSalazar}
                alt="Mario Salazar"
                className="homeimage"
              />
              E-Shop Mario Salazar
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
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
      <Categories />
    </div>
  );
};

export default NavBar;
