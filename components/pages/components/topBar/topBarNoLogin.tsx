'use client';
import React from 'react';
export default function TopBarNoLogin() {
  return (
    <div>
      <div>
        <h1>This is a TopBar.tsx when not login</h1>
        <a id="loginPage" href="/login">
          Đăng nhập
        </a>
        <a id="registerPage" href="/register">
          Đăng ký
        </a>
        <br />
      </div>
    </div>
  );
}
