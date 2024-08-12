import { NextResponse } from 'next/server';
import { GetSubjectList } from '@/backend/database/subject';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import SystemMessage from '@/backend/messages/systemMessage';

export async function GET() {
  try {
    const subjectList = await GetSubjectList();

    return new NextResponse(JSON.stringify(subjectList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
