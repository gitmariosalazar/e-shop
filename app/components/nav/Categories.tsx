"use client";

import { categories } from "@/utils/Categorie";
import Container from "../Container";
import Category from "./Category";
import {
  usePathname,
  useSearchParams,
} from "next/dist/client/components/navigation";
export const dynamic = "force-dynamic";

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <div className="bg-slate-800">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item: any) => (
            <div key={item.id}>
              <Category
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={
                  category === item.label ||
                  (category === null && item.label === "All")
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
