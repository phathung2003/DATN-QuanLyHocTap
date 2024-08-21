import ConversationList from '@/components/page/chat/conversationList';
import { GetUserID } from '@/backend/feature/validate';
import CheckOnline from '@/components/page/other/checkOnline';

export default async function AdminMainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userID = await GetUserID();

  return (
    <div className="flex h-[80vh] bg-white dark:bg-slate-900">
      <CheckOnline userID={userID} />
      {/* Conversation List*/}
      <div className="w-4/12 bg-white p-4 dark:bg-slate-800">
        <div className="text-lg font-bold ">
          <ConversationList userID={userID} />
        </div>
      </div>
      <div className="w-px bg-slate-100 dark:bg-slate-900"></div>
      {/* Main Content */}
      <div className="w-8/12 bg-slate-100 p-4 dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}
