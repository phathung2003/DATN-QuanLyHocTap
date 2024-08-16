import React from 'react';
import ChatContent from './chat';
import { GetUserID } from '@/backend/feature/validate';
import { GetOpponentName } from '@/backend/database/chat';

interface IMessagePageProps {
  params: {
    roomID: string;
  };
}

const MessagingLayout = async ({ params }: IMessagePageProps) => {
  const { roomID } = params;
  const userID = await GetUserID();
  const opponentName = await GetOpponentName(roomID, userID);
  return (
    <ChatContent roomID={roomID} opponentName={opponentName} userID={userID} />
  );
};

export default MessagingLayout;
