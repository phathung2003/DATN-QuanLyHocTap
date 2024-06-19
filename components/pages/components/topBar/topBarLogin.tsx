'use client';
import React from 'react';
import { LogOut } from '@/components/process/feature/logout';
import { useSession } from 'next-auth/react';

export default function TopBarLogin() {
  const { data: session } = useSession();
  return (
    <div>
      <div>
        <h1>This is a TopBar.tsx when login</h1>
        <p>Xin chào, {session?.user?.name}!</p>;
        <button id="logoutButton" onClick={LogOut}>
          Đăng xuất
        </button>
        <br />
      </div>
    </div>
  );
}
