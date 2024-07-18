import NextAuth, { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

const adminGitHubAcc = ["amirhosseindeveloper00@gmail.com"];

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminGitHubAcc.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminGitHubAcc.includes(session.user.email)) {
    res.status(401)
    throw "Not Admin";
  }
}
