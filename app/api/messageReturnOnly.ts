import { NextResponse } from 'next/server';

export default function MessageReturnOnly(
  messageInfo: string | null,
  statusCode: number,
) {
  return NextResponse.json({ message: messageInfo }, { status: statusCode });
}
