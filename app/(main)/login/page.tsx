import LoginPage from '@/app/(main)/login/loginPage';
import { CookieCheck } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
export default async function Login() {
  const result = await CookieCheck();
  if (result == false) {
    return HomePage();
  }
  return <LoginPage />;
}
