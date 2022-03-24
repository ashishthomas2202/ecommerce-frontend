import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../utils/db';
import User from '../../../models/User';

export default NextAuth({
  section: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let query = {};

        if (credentials.userId) {
          query['$or'] = [
            { email: credentials.userId },
            { username: credentials.userId },
          ];
        } else if (credentials.email) {
          query['email'] = credentials.email;
        } else if (credentials.username) {
          query['username'] = credentials.username;
        }

        await db.connect();
        const user = await User.findOne(query);

        if (!user) {
          await db.disconnect();
          throw new Error(
            `Invalid ${
              query.email
                ? 'Email'
                : query.username
                ? 'Username'
                : 'Email/Username'
            } or password`
          );
        }

        if (!user.authenticate(credentials.password)) {
          await db.disconnect();
          throw new Error(
            `Invalid ${
              query.email
                ? 'Email'
                : query.username
                ? 'Username'
                : 'Email/Username'
            } or password`
          );
        }

        await db.disconnect();
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      let user = token.user;
      let userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        account: user.account,
        user: user._id,
      };

      if (user.email) {
        userData['email'] = user.email;
      }
      if (user.username) {
        userData['username'] = user.username;
      }

      session.user = userData;

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
