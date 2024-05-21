import { Authentication } from '@/app/api/auth/[...nextauth]/authentication';
const handler = Authentication;
export { handler as GET, handler as POST };
