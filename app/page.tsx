// import React from 'react';

// export default async function Home() {
//   return (
//     <main className="overflow-hidden">
//       <p>This is HomePage Page</p>
//     </main>
//   );
// }

import TrangChuAd from '@/components/Dashboard/TrangChuAd';
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export const metadata: Metadata = {
  title: 'HungThanh',
  description: 'Đây là project của HungThanh',
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <TrangChuAd />
      </DefaultLayout>
    </>
  );
}
