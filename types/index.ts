import { User } from "@prisma/client";

export type SafeUser =
  | Omit<
      User,
      | "createdAt"
      | "updatedAt"
      | "emailVerified"
      | "id"
      | "name"
      | "email"
      | "image"
      | "hashedPassword"
      | "role"
    > & {
      createdAt: string;
      updatedAt: string;
      emailVerified: string | null;
      id: string;
      name: string;
      email: string;
      image: string;
      hashedPassword: string;
      role: string;
    };
