import React from 'react';

export default function NotFoundData() {
  return (
    <div className="bg-gray-100 flex h-[84vh] items-center justify-center">
      <div className="bg-gray-100 flex flex-grow items-center justify-center">
        <div className="text-center">
          <h1 className="text-red-500 text-4xl font-bold">
            Không tìm thấy nội dung
          </h1>
          <p className="text-gray-700 mt-4 text-lg">
            Xin vui lòng điền đúng và đủ thông tin và thử lại sau.
          </p>
        </div>
      </div>
    </div>
  );
}
