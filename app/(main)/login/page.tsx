import { Metadata } from 'next';
import { HomePage } from '@/backend/routers';
import { CookieCheck } from '@/backend/feature/validate';
import LoginPage from '@/components/page/login/loginPage';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Trang đăng nhập tài khoản người dùng',
};

export default async function Login() {
  const result = await CookieCheck();
  if (result == false) {
    return HomePage();
  }
  return <LoginPage />;
}
