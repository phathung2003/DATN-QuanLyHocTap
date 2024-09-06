import { NextResponse } from 'next/server';
import { GetGradeList } from '@/backend/database/grade';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import SystemMessage from '@/backend/messages/systemMessage';

export async function GET() {
  try {
    const gradeList = await GetGradeList();

    return new NextResponse(JSON.stringify(gradeList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
