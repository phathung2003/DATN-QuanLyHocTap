import RegisterPage from '@/app/(main)/register/registerPage';
import { CookieCheck } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';

export default async function Register() {
  const result = await CookieCheck();
  if (result == false) {
    return HomePage();
  }
  return <RegisterPage />;
}
