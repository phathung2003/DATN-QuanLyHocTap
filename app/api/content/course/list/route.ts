import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { GetCourse } from '@/backend/database/course';

export async function GET(request) {
  try {
    const collectionIDRequest = request.nextUrl.searchParams.get('courseID');
    const collectionList = await GetCourse(collectionIDRequest);

    return new NextResponse(JSON.stringify(collectionList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
