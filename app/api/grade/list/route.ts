import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { GetGradeList } from '@/backend/database/grade';

export async function GET() {
  try {
    const gradeList = await GetGradeList();

    return new NextResponse(JSON.stringify(gradeList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
