'use client';
import React, { useEffect } from 'react';
import LoginPage from '@/components/pages/loginPage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/pages/components/loadingPage';

export default function Login() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    // Điều hướng chỉ thực hiện trên client-side
    if (sessionStatus === 'authenticated') {
      return router.back();
    }
  }, [sessionStatus, router]); // Thêm router vào dependency array để useEffect cập nhật khi router thay đổi
  if (sessionStatus === 'loading') {
    return <LoadingPage />;
  }
  if (sessionStatus === 'unauthenticated') {
    return <LoginPage />;
  }
}
