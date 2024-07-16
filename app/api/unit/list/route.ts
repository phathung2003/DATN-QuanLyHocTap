import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { GetUnit } from '@/backend/database/unit';

export async function GET(request) {
  try {
    const collectionID = request.nextUrl.searchParams.get('collectionID');
    const unitID = request.nextUrl.searchParams.get('unitID');

    if (!collectionID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }
    const unitList = await GetUnit(collectionID, unitID);

    return new NextResponse(JSON.stringify(unitList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
