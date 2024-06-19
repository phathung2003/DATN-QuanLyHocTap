import React from 'react';
import { getServerSession } from 'next-auth';
import TopBarNoLogin from '@/components/pages/components/topBar/topBarNoLogin';
import TopBarLogin from '@/components/pages/components/topBar/topBarLogin';
const TopBar = async () => {
  const session = await getServerSession();
  if (session) {
    return <TopBarLogin />;
  }
  return <TopBarNoLogin />;
};
export default TopBar;
