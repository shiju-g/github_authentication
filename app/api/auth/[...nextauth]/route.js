import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export { authOptions as GET, authOptions as POST };
