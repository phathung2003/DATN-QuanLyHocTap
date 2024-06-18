<<<<<<< HEAD
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
=======
import React from 'react';
import LoginPage from '../../pages/loginPage'

const Login = () => {
  return (
    <main>
      <LoginPage />
    </main>
  );
};
export default Login;
>>>>>>> e919764 (commit Front end nhe iu)
