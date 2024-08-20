import ConversationList from '@/components/page/chat/conversationList';
import { GetUserID } from '@/backend/feature/validate';
import CheckOnline from '@/components/page/other/checkOnline';

export default async function AdminMainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userID = await GetUserID();

  return (
    <div className="bg-gray-900 flex h-[80wh]">
      <CheckOnline userID={userID} />
      {/* Conversation List*/}
      <div className="bg-gray-800 w-4/12 p-4">
        <div className="text-lg font-bold ">
          <ConversationList userID={userID} />
        </div>
      </div>
      <div className="w-px bg-black dark:bg-white"></div>
      {/* Main Content */}
      <div className="bg-gray-900 w-8/12 p-4">{children}</div>
    </div>
  );
}
