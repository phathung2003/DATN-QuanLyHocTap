import LoginPage from '@/components/pages/loginPage';
import { cookies as cookieUtils } from 'next/headers';
import { HomePage } from '@/components/process/routers/routers';

async function loader() {
  // Access cookies from the context
  const hadLogin = cookieUtils().get('token');
  // Redirect if user is already logged in
  if (hadLogin != undefined) {
    return false;
  } else return true;
}

export default async function Login() {
  const result = await loader();
  if (result == false) {
    return HomePage();
  }
  return <LoginPage />;
}
