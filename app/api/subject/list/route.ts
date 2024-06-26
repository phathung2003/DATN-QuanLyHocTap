import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { GetSubjectList } from '@/backend/database/subject';

export async function GET() {
  try {
    const subjectList = await GetSubjectList();

    return new NextResponse(JSON.stringify(subjectList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
