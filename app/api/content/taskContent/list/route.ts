import { NextResponse } from 'next/server';
import { GetContent } from '@/backend/database/content';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';

export async function GET(request) {
  try {
    const courseID = request.nextUrl.searchParams.get('courseID');
    const unitID = request.nextUrl.searchParams.get('unitID');
    const taskID = request.nextUrl.searchParams.get('taskID');
    const contentID = request.nextUrl.searchParams.get('contentID');

    if (!courseID || !unitID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }
    const contentList = await GetContent(courseID, unitID, taskID, contentID);

    return new NextResponse(JSON.stringify(contentList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
