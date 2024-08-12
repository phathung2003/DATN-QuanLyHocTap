import { NextResponse } from 'next/server';
import { GetTask } from '@/backend/database/task';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';

export async function GET(request) {
  try {
    const courseID = request.nextUrl.searchParams.get('courseID');
    const unitID = request.nextUrl.searchParams.get('unitID');
    const taskID = request.nextUrl.searchParams.get('taskID');
    if (!courseID || !unitID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }
    const taskList = await GetTask(courseID, unitID, taskID);

    return new NextResponse(JSON.stringify(taskList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
