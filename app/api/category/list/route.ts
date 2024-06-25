import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { GetCategoryList } from '@/backend/database/category';

export async function GET() {
  try {
    const categoryList = await GetCategoryList();

    return new NextResponse(JSON.stringify(categoryList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
