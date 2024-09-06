import { NextResponse } from 'next/server';
import { GetCourse } from '@/backend/database/course';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import SystemMessage from '@/backend/messages/systemMessage';

export async function GET(request) {
  try {
    const collectionIDRequest = request.nextUrl.searchParams.get('courseID');
    const collectionList = await GetCourse(collectionIDRequest);

    return new NextResponse(JSON.stringify(collectionList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
