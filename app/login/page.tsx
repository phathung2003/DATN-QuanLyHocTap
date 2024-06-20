<<<<<<< HEAD
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
=======
>>>>>>> 6fc576352610b9f8c6125fedba7a75af0bb0df06
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
