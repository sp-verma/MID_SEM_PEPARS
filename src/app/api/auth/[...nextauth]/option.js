import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { conectDB } from "@/lib/conection";

conectDB();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "login",
      pages: { signIn: "/login" },
      // credentials: {
      //   email: {
      //     label: "Email",
      //     type: "email",
      //     placeholder: "enter your email",
      //   },
      //   password: {
      //     label: "password",
      //     type: "password",
      //   },
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;

        if (!email || !password)
          throw new Error("Please enter email & password");

        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new Error("You are not registered");

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) throw new Error("Incorrect Credentials");

        // Any object returned will be saved in `user` property of the JWT
        return user;
      },
      callbacks: {
        async jwt({ token, user }) {
          // token.isAdmin = true; // user.isAdmin
          return token;
        },
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          return { ...session, user: { ...token } };
        },
      },
    }),
  ],
};
