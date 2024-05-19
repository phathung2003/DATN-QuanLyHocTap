import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Login } from '@/components/process/database/users';
import bcrypt from 'bcrypt';

export const Authentication = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        info: { label: 'info', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null; // Mật khẩu không đúng
        const { info, password } = credentials;
        const userData = await Login(info);
        if (userData != null && !userData.empty) {
          const userInfo = userData.docs[0].data();
          const isMatch = await bcrypt.compare(password, userInfo.password);
          if (isMatch) {
            const user = {
              id: userData.docs[0].id,
              username: userInfo.username,
              name: userInfo.name,
            };
            return user; // Đăng nhập thành công
          } else {
            return null; // Mật khẩu không đúng
          }
        } else {
          return null; // Tài khoản không tồn tại
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // If the user object exists, it means this is the login step where user data is available.
      if (user) {
        token.id = user.id; // Assign user ID from user object to JWT
        token.username = user.username; // Assign username from user object to JWT
        token.name = user.name; // Optionally, assign the name too if you want it in the JWT
      }
      return token;
    },
    session: async ({ session, token }) => {
      // The session callback is called whenever the session is checked. Here you transfer data from JWT to session.
      session.user.id = token.id; // Transfer the user's ID from the JWT to the session object.
      session.user.name = token.name;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/login', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
});

const handler = Authentication;
export { handler as GET, handler as POST };
