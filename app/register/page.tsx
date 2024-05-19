'use client';
import React, { useEffect } from 'react';
import RegisterPage from '@/components/pages/registerPage';
import LoadingPage from '@/components/pages/components/loadingPage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
