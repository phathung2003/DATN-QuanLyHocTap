import React from 'react';

export default function MessagingLayout() {
  return (
    <div className="flex h-[79vh] items-center justify-center bg-slate-100 dark:bg-slate-800">
      <div className="flex flex-grow items-center justify-center bg-slate-100 dark:bg-slate-800">
        <div className="text-center">
          <h1 className="text-red-500 text-2xl">
            Hãy chọn đoạn hội thoại để tiếp tục
          </h1>
        </div>
      </div>
    </div>
  );
}
