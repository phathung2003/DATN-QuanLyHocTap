import React from 'react';
import MessagePage from '@/components/page/chat/messagePage';
import { GetUserID } from '@/backend/feature/validate';
import { GetOpponentInfo } from '@/backend/database/chat';

interface IMessagePageProps {
  params: {
    roomID: string;
  };
}

const MessagingLayout = async ({ params }: IMessagePageProps) => {
  const { roomID } = params;
  const userID = await GetUserID();
  const opponentInfo = await GetOpponentInfo(roomID, userID);
  return (
    <MessagePage
      roomID={roomID}
      opponentID={opponentInfo[1]}
      opponentName={opponentInfo[0]}
      userID={userID}
    />
  );
};

export default MessagingLayout;
