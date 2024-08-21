import { Metadata } from 'next';
import { HomePage } from '@/backend/routers';
import { CookieCheck } from '@/backend/feature/validate';
import RegisterPage from '@/components/page/register/user/registerPage';

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Trang đăng ký tài khoản người dùng',
};

export default async function Register() {
  const result = await CookieCheck();
  if (result == false) {
    return HomePage();
  }
  return <RegisterPage />;
}
