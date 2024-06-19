import LoginPage from '@/components/pages/loginPage';
import { CookieCheck } from '@/components/process/feature/validate';
import { HomePage } from '@/components/process/routers/routers';
export default async function Login() {
  const result = await CookieCheck();
  if (result == false) {
    return HomePage();
  }
  return <LoginPage />;
}
