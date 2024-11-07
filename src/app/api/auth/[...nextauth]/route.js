import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {

          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          console.log(user);
          return user;

        } catch (error) {
          console.log("Error: ", error)
        }

      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        return {
          ...token,
          id: user._id,
          gender: user.gender,
          date: user.date,
          month: user.month,
          year: user.year,
          lname: user.lname
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          gender: token.gender,
          date: token.date,
          month: token.month,
          year: token.year,
          lname: token.lname
        }
      }
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

