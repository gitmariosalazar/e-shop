import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentuser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: { orders: true },
    });
    if (!currentuser) {
      return null;
    }
    return {
      ...currentuser,
      createdAt: currentuser.createdAt.toISOString(),
      updatedAt: currentuser.updatedAt.toISOString(),
      emailVerified: currentuser.emailVerified
        ? currentuser.emailVerified.toISOString()
        : null,
      id: currentuser.id.toString() || "",

      name: currentuser.name?.toString() || "",
      email: currentuser.email?.toString() || "",
      image: currentuser.image?.toString() || "",
      hashedPassword: currentuser.hashedPassword?.toString() || "",
      role: currentuser.role.toString(),
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
