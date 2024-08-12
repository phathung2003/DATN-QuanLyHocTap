import { NextResponse } from 'next/server';
import { GetContent } from '@/backend/database/taskFull';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';

export async function GET(request) {
  try {
    const courseID = request.nextUrl.searchParams.get('courseID');
    const unitID = request.nextUrl.searchParams.get('unitID');

    if (!courseID || !unitID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }
    const unitList = await GetContent(courseID, unitID);

    return new NextResponse(JSON.stringify(unitList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
