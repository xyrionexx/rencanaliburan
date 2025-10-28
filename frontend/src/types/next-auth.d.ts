import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Tambah properti custom di user & session
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      role?: string;
      picture?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    picture?: string;
  }
}
