import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      name: "Twitter",
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "joedoe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (user !== null) {
          const isRegistered = await bcrypt.compare(
            credentials.password,
            user?.password ?? ""
          );
          if (isRegistered) {
            return user;
          } else {
            throw new Error(
              "Please make sure you insert the correct email & password."
            );
          }
        } else {
          const security = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          );

          if (!credentials.password.match(security)) {
            throw new Error("Por favor ingrese una clave segura");
          }
          // Verify password values
          const hashedPassword = await bcrypt.hash(credentials.password, 6);
          const registered = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return registered;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      // session.accessToken = user.accessToken;
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    signIn: async ({ user, account, profile }) => {
      // const isAllowedToSignIn = true;
      // if (isAllowedToSignIn) {
      //   return true;
      // } else {
      //   // Return false to display a default error message
      //   return false;
      //   // Or you can return a URL to redirect to:
      //   // return '/unauthorized'
      // }
      return true;
    },
  },
  theme: {
    colorScheme: "light",
    brandColor: "#000",
  },
};
