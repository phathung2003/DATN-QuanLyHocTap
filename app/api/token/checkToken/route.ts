import { NextResponse } from 'next/server';
import { CheckSession } from '@/components/process/database/session';

export async function POST(request: Request) {
  const data = await request.json();
  const { tokenID } = data;
  const userData = await CheckSession(tokenID);
  console.log(userData);
  if ('status' in userData && userData.status === false) {
    return NextResponse.json({ message: userData.message }, { status: 404 });
  } else {
    return new NextResponse(
      JSON.stringify({
        message: 'Phiên đăng nhập hợp lệ',
        userInfo: userData,
      }),
      {
        status: 200, // Thiết lập mã trạng thái HTTP phản hồi tại đây
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
