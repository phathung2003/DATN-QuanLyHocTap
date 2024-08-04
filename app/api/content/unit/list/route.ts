import { NextResponse } from 'next/server';
import { GetUnit } from '@/backend/database/unit';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';

export async function GET(request) {
  try {
    const courseID = request.nextUrl.searchParams.get('courseID');
    const unitID = request.nextUrl.searchParams.get('unitID');

    //Kiểm tra có mã khóa học không
    if (!courseID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Lấy danh sách b
    const unitList = await GetUnit(courseID, unitID);
    return new NextResponse(JSON.stringify(unitList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
