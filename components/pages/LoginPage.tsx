'use client'
import React from "react";
import { useState } from "react"; // Add import statement
import LoginProcess from "../process/login"

export default function Login(){
  const [username, setUsername] = useState(""); // Remove 'useClient.React.'
  const [password, setPassword] = useState(""); // Remove 'useClient.React.'

  const handleLogin = () => 
  { 
    setPassword(LoginProcess(username, password))
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form>
        <label id="info_LoginLable">Tên đăng nhập/Email/Số điện thoại:</label>
        <input
            id="info_LoginInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
        <br />
        <label id="password_LoginLable">Mật khẩu:</label>
        <input
            id="password_LoginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
       
        <br />
        <a id="forgetPasswordURL" href="/login">Quên mật khẩu ?</a>
        <br />
        <button id="loginButton" type="button" onClick={handleLogin}>Đăng nhập</button>
        <button id="registerButton" type="button"  onClick={() => { window.location.href = "/register"; }}>Đăng ký</button>
      </form>
    </div>
  );
};