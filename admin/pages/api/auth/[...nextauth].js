import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const nextAuthOptions = {
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        })
      ]
}

export default NextAuth(nextAuthOptions)