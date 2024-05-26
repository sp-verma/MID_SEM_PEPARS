import NextAuth from "next-auth/next";
import { authOptions } from "./option";

const Handeler = NextAuth(authOptions);

export { Handeler as GET, Handeler as POST };
