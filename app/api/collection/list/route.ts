import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { GetCollection } from '@/backend/database/collection';

export async function GET(request) {
  try {
    const collectionIDRequest =
      request.nextUrl.searchParams.get('collectionID');
    const collectionList = await GetCollection(collectionIDRequest);

    return new NextResponse(JSON.stringify(collectionList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
