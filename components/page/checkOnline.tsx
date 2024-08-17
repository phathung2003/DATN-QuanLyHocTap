'use client';
import { useEffect } from 'react';
import { TrackUserOnlineStatus } from '@/backend/database/users';

interface ICheckOnline {
  userID: string;
}

const CheckOnline: React.FC<ICheckOnline> = ({ userID }) => {
  useEffect(() => {
    if (userID) {
      TrackUserOnlineStatus(userID);
    }
  }, [userID]);

  return <div />;
};

export default CheckOnline;
