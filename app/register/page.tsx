<<<<<<< HEAD
<<<<<<< HEAD
'use client';
import React, { useEffect } from 'react';
import RegisterPage from '@/components/pages/registerPage';
import LoadingPage from '@/components/pages/components/loadingPage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

=======
import React from 'react';
import RegisterPage from '@/pages/registerPage';
>>>>>>> e919764 (commit Front end nhe iu)
=======
import React from 'react';
import RegisterPage from '@/pages/registerPage';
>>>>>>> 6fc576352610b9f8c6125fedba7a75af0bb0df06
const Register = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    // Điều hướng chỉ thực hiện trên client-side
    if (sessionStatus === 'authenticated') {
      router.back();
    }
  }, [sessionStatus, router]); // Thêm router vào dependency array để useEffect cập nhật khi router thay đổi
  if (sessionStatus === 'loading') {
    return <LoadingPage />;
  }
  if (sessionStatus === 'unauthenticated') {
    return <RegisterPage />;
  }
};
export default Register;
