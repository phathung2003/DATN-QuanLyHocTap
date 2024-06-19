// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    username?: string;
    name?: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string; // Assuming `id` is always present and is a string.
    username?: string; // Optional username field
    name?: string;
  }

  interface Session {
    user: {
      id?: string;
      username?: string;
      name?: string;
    };
  }
}
