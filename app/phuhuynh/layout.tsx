"use client";


import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react';
import "../../css/index.css";
import  AuthProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section lang="en">           
      <div className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <AuthProvider>        
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {children}
          </div>           
        </AuthProvider>
      </div>
    </section>
  );
}


